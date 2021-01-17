export default {
  async purchaseStock({ dispatch, getters }, { code, quantity }) {
    const stock = getters.getStockByCode(code);

    if (stock === null) {
      throw new Error(`No stock with the code ${code} was found`);
    }

    const amount = quantity * stock.price;

    await dispatch('decreaseFunds', amount, { root: true });
    await dispatch('portfolio/addStockToPortfolio', { code, quantity }, { root: true });
  },
  async sellStock({ dispatch, getters }, { code, quantity }) {
    const stock = getters.getStockByCode(code);

    if (stock === null) {
      throw new Error(`No stock with the code ${code} was found`);
    }

    const amount = quantity * stock.price;

    await dispatch('increaseFunds', amount, { root: true });
    await dispatch('portfolio/removeStockFromPortfolio', { code, quantity }, { root: true });
  },
};
