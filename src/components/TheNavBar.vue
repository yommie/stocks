<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link :to="{ name: 'Home' }" class="navbar-brand">Stock Trader</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <router-link :to="{ name: 'Portfolio' }" tag="li" class="nav-item">
          <a class="nav-link">Portfolio</a>
        </router-link>
        <router-link :to="{ name: 'Stocks' }" tag="li" class="nav-item">
          <a class="nav-link">Stocks</a>
        </router-link>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            class="nav-link"
            style="cursor:pointer !important;"
            @click="endDay"
          >End Day</a>
        </li>
        <li class="nav-item dropdown" :class="{ show: showMenuDropdown }">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            @click="toggleMenuDropdown"
          >
            Save & Load
          </a>
          <div
            class="dropdown-menu"
            aria-labelledby="navbarDropdown"
            :class="{ show: showMenuDropdown }"
          >
            <a
              class="dropdown-item"
              href="#"
              @click="saveSession"
            >Save Data</a>
            <div class="dropdown-divider"></div>
            <a
              class="dropdown-item"
              href="#"
              @click="loadSession"
            >Load Data</a>
          </div>
        </li>
      </ul>
      <span class="navbar-text">
        Funds: {{ availableFunds }}
      </span>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import currency from '../utils/currency';

export default {
  setup() {
    const store = useStore();

    const showMenuDropdown = ref(false);
    const availableFunds = computed(() => currency(store.getters.getAvailableFunds));

    function toggleMenuDropdown() {
      showMenuDropdown.value = !showMenuDropdown.value;
    }

    async function endDay() {
      try {
        await store.dispatch('endDay');
      } catch (error) {
        console.log(error.message);
      }
    }

    async function saveSession() {
      try {
        await store.dispatch('saveSession');
      } catch (error) {
        console.log(error.message);
      }

      showMenuDropdown.value = false;
    }

    async function loadSession() {
      try {
        await store.dispatch('loadSession');
      } catch (error) {
        console.log(error.message);
      }

      showMenuDropdown.value = false;
    }

    return {
      availableFunds,
      showMenuDropdown,
      toggleMenuDropdown,
      endDay,
      saveSession,
      loadSession,
    };
  },
};
</script>

<style scoped>
  nav {
    position: relative;
    z-index: 1000;
  }
</style>
