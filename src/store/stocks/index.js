import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state() {
    return {
      stocks: [
        {
          name: 'BMW',
          code: 'BMMW',
          price: 12.50,
        },
        {
          name: 'Tesla',
          code: 'TESL',
          price: 15.00,
        },
        {
          name: 'Apple',
          code: 'APPL',
          price: 10.00,
        },
        {
          name: 'Daimer',
          code: 'DAER',
          price: 11.00,
        },
      ],
    };
  },
  getters,
  actions,
  mutations,
};
