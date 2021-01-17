import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state() {
    return {
      portfolio: [],
    };
  },
  getters,
  actions,
  mutations,
};
