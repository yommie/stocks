import { createStore } from 'vuex';

import getters from './getters';
import mutations from './mutations';
import actions from './actions';

import stocks from './stocks';
import portfolio from './portfolio';

export default createStore({
  state() {
    return {
      isBooted: false,
      startingFunds: 500.00,
      availableFunds: 0.00,
    };
  },
  actions,
  getters,
  mutations,
  modules: {
    stocks,
    portfolio,
  },
});
