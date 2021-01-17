export default {
  setBootState(state, isBooted) {
    state.isBooted = isBooted;
  },
  setAvailableFunds(state, funds) {
    state.availableFunds = funds;
  },
  incrementAvailableFunds(state, amount) {
    state.availableFunds += amount;
  },
  decrementAvailableFunds(state, amount) {
    state.availableFunds -= amount;
  },
};
