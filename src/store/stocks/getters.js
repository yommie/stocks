import sort from '../../utils/sort';

export default {
  getStocks(state) {
    return state.stocks.sort((a, b) => {
      const A = a.name.toUpperCase();
      const B = b.name.toUpperCase();

      return sort(A, B);
    });
  },
  getStockByCode: (state) => (code) => {
    const stock = state.stocks.find((s) => s.code === code);

    if (stock !== undefined) {
      return stock;
    }

    return null;
  },
};
