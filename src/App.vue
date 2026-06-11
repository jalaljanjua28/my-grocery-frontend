<template>
  <div id="app">
    <loading-page />
    <router-view />
  </div>
</template>

<script>
import LoadingPage from "./components/LoadingPage.vue";

export default {
  components: {
    LoadingPage,
  },
  mounted() {
    // Safety fallback: force-clear loading if it's still stuck after 3 seconds
    setTimeout(() => {
      if (this.$store.state.loading) {
        this.$store.commit("setLoading", false);
      }
    }, 3000);
  },
};
</script>
