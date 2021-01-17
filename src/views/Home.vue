<template>
  <div class="jumbotron">
    <h1 class="display-4">Trade or view your portfolio</h1>
    <p class="lead">You may save or load your data</p>
    <p>Click on <strong>End Day</strong> to begin a new day</p>
    <hr class="my-4">
    <h3>Your Funds: {{ availableFunds }}</h3>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import currency from '../utils/currency';

export default {
  setup() {
    const store = useStore();

    const availableFunds = computed(() => currency(store.getters.getAvailableFunds));

    return {
      availableFunds,
    };
  },
};
</script>
