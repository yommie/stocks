import sort from '../../utils/sort';

export default {
  getPortfolio(state, getters, rootState, rootGetters) {
    return state.portfolio.map((portfolio) => {
      const stock = rootGetters['stocks/getStockByCode'](portfolio.code);

      return {
        stock,
        quantity: portfolio.quantity,
      };
    }).sort((a, b) => {
      const A = a.stock.name.toUpperCase();
      const B = b.stock.name.toUpperCase();

      return sort(A, B);
    });
  },
};
