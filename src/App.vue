<template>
  <nav-bar/>
  <transition
    mode="out-in"
    name="slide"
  >
    <router-view/>
  </transition>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import NavBar from './components/TheNavBar.vue';

export default {
  components: {
    NavBar,
  },
  setup() {
    const store = useStore();

    const isBooted = computed(() => store.getters.isBooted);

    if (!isBooted.value) {
      store.dispatch('bootApp');
    }
  },
};
</script>

<style scoped>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
      transform: translateX(0px);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  .slide-enter-active {
    animation: fade-in .2s ease-in forwards;
  }

  .slide-leave-active {
    animation: fade-out .2s ease-out forwards;
  }
</style>
