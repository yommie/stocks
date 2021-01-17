export default {
  addStockToPortfolio(state, { code, quantity }) {
    const portfolioStock = state.portfolio.find((ps) => ps.code === code);

    if (portfolioStock !== undefined) {
      portfolioStock.quantity += quantity;
      return;
    }

    state.portfolio.push({ code, quantity });
  },
  removeStockFromPortfolio(state, { code, quantity }) {
    const portfolioStock = state.portfolio.find((ps) => ps.code === code);

    if (portfolioStock !== undefined) {
      portfolioStock.quantity -= quantity;

      if (portfolioStock.quantity < 1) {
        const index = state.portfolio.findIndex((ps) => ps.code === code);

        if (index > -1) {
          state.portfolio.splice(index, 1);
        }
      }
    }
  },
  emptyPortfolio(state) {
    state.portfolio = [];
  },
};
