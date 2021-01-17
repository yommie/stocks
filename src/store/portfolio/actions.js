export default {
  addStockToPortfolio({ commit }, { code, quantity }) {
    commit('addStockToPortfolio', { code, quantity });
  },
  removeStockFromPortfolio({ commit }, { code, quantity }) {
    commit('removeStockFromPortfolio', { code, quantity });
  },
};
