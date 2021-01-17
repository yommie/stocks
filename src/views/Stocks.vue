<template>
  <div class="row">
    <div class="col-sm-6" v-for="stock in stocks" :key="stock.code">
      <stock :stock="stock"/>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Stock from '../components/Stock.vue';

export default {
  setup() {
    const store = useStore();

    const stocks = computed(() => store.getters['stocks/getStocks']);

    return {
      stocks,
    };
  },
  components: {
    Stock,
  },
};
</script>
