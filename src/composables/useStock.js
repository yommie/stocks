import { ref, computed } from 'vue';
import currency from '../utils/currency';

export default function (stock) {
  const quantity = ref(0);

  const stockPrice = computed(() => currency(stock.price));

  const isFormValid = computed(() => quantity.value > 0);

  return {
    quantity,
    stockPrice,
    isFormValid,
  };
}
