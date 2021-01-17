import roundNumber from '../utils/numbers';

export default {
  bootApp({ commit, getters }) {
    const startingFunds = getters.getStartingFunds;

    commit('setAvailableFunds', startingFunds);
    commit('setBootState', true);
  },
  increaseFunds({ commit }, amount) {
    commit('incrementAvailableFunds', roundNumber(amount));
  },
  decreaseFunds({ commit }, amount) {
    commit('decrementAvailableFunds', roundNumber(amount));
  },
  async endDay({ getters, commit }) {
    const stocks = getters['stocks/getStocks'];

    stocks.forEach((stock) => {
      const increase = Math.random() > 0.5;
      const adjustment = Math.random() * 3;

      const newPrice = (increase) ? stock.price + adjustment : stock.price - adjustment;

      commit('stocks/setStockPrice', {
        code: stock.code,
        newPrice: newPrice < 0 ? 0.00 : newPrice,
      });
    });
  },
  saveSession({ getters }) {
    const availableFunds = getters.getAvailableFunds;
    const portfolio = getters['portfolio/getPortfolio'].map((p) => ({
      code: p.stock.code,
      quantity: p.quantity,
    }));
    const stocks = getters['stocks/getStocks'].map((stock) => ({
      code: stock.code,
      price: stock.price,
    }));

    const sessionData = {
      availableFunds,
      portfolio,
      stocks,
    };

    localStorage.setItem('sessionData', JSON.stringify(sessionData));
  },
  loadSession({ commit }) {
    const session = localStorage.getItem('sessionData');

    if (session === null) {
      return;
    }

    const sessionData = JSON.parse(session);

    commit('setBootState', true);
    commit('setAvailableFunds', sessionData.availableFunds);

    sessionData.stocks.forEach((stock) => {
      commit('stocks/setStockPrice', {
        code: stock.code,
        newPrice: stock.price,
      });
    });

    commit('portfolio/emptyPortfolio');

    sessionData.portfolio.forEach((portfolio) => {
      commit('portfolio/addStockToPortfolio', {
        code: portfolio.code,
        quantity: portfolio.quantity,
      });
    });
  },
};
