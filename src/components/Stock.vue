<template>
  <div class="mt-4">
    <div class="card">
      <h5 class="card-header">{{ stock.name }} <small>({{ stockPrice }})</small></h5>
      <div class="card-body">
        <div class="form-group row mb-0">
          <div class="col-sm-7">
            <input
              type="number"
              class="form-control shadow-none"
              placeholder="Quantity"
              v-model.number="quantity"
              :class="{ 'invalid-field': !canPurchaseStock }"
            >
          </div>
          <div class="col-sm-5">
            <button
              class="btn btn-block shadow-none"
              :class="{ 'btn-success': canPurchaseStock, 'btn-danger': !canPurchaseStock }"
              :disabled="!isFormValid || !canPurchaseStock"
              @click="purchaseStock"
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
    stock: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const { quantity, stockPrice, isFormValid } = useStock(props.stock);

    const canPurchaseStock = computed(() => {
      const availableFunds = store.getters.getAvailableFunds;

      return availableFunds >= props.stock.price * quantity.value;
    });

    const buttonText = computed(() => (canPurchaseStock.value ? 'Buy' : 'Insufficient'));

    async function purchaseStock() {
      try {
        await store.dispatch('stocks/purchaseStock', {
          code: props.stock.code,
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
      canPurchaseStock,
      buttonText,
      isFormValid,
      purchaseStock,
    };
  },
};
</script>

<style scoped>
  .invalid-field {
    border-color: red !important;
  }
</style>
