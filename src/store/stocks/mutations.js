import roundNumber from '../../utils/numbers';

export default {
  setStockPrice(state, { code, newPrice }) {
    const stock = state.stocks.find((s) => s.code === code);

    stock.price = roundNumber(newPrice);
  },
};
