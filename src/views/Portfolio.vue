<template>
  <div class="row">
    <template v-if="portfolio.length > 0">
      <div class="col-sm-6" v-for="p in portfolio" :key="p.stock.code">
        <portfolio-stock :portfolio-stock="p"/>
      </div>
    </template>
    <div class="col" v-else>
      <div class="alert alert-warning mt-4">
        <h4 class="alert-heading">Empty Portfolio!</h4>
        <hr>
        You've not added any stock to your portfolio.
        Head to
        <router-link :to="{ name: 'Stocks' }" class="alert-link">stocks</router-link>
        to add some.
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import PortfolioStock from '../components/PortfolioStock.vue';

export default {
  setup() {
    const store = useStore();

    const portfolio = computed(() => store.getters['portfolio/getPortfolio']);

    return {
      portfolio,
    };
  },
  components: {
    PortfolioStock,
  },
};
</script>
