<template>
  <div class="mt-4">
    <div class="card">
      <h5 class="card-header">
        {{ portfolioStock.stock.name }}
        <small>({{ stockPrice }} | {{ portfolioStock.quantity }} left)</small>
      </h5>
      <div class="card-body">
        <div class="form-group row mb-0">
          <div class="col-sm-7">
            <input
              type="number"
              class="form-control shadow-none"
              placeholder="Quantity"
              v-model.number="quantity"
              :class="{ 'invalid-field': !canSellStock }"
            >
          </div>
          <div class="col-sm-5">
            <button
              class="btn btn-block shadow-none"
              :class="{ 'btn-success': canSellStock, 'btn-danger': !canSellStock }"
              :disabled="!isFormValid || !canSellStock"
              @click="sellStock"
            >{{ buttonText }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import useStock from '../composables/useStock';

export default {
  props: {
    portfolioStock: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const { quantity, stockPrice, isFormValid } = useStock(props.portfolioStock.stock);

    const canSellStock = computed(() => props.portfolioStock.quantity >= quantity.value);

    const buttonText = computed(() => (canSellStock.value ? 'Sell' : 'Insufficient'));

    async function sellStock() {
      try {
        await store.dispatch('stocks/sellStock', {
          code: props.portfolioStock.stock.code,
          quantity: quantity.value,
        });

        quantity.value = 0;
      } catch (error) {
        console.log(error.message);
      }
    }

    return {
      quantity,
      stockPrice,
      canSellStock,
      buttonText,
      isFormValid,
      sellStock,
    };
  },
};
</script>

<style scoped>
  .invalid-field {
    border-color: red !important;
  }
</style>
