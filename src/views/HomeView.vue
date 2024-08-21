<template>
  <div id="app">
    <el-container
      style="width: -webkit-fill-available !important; height: 163vh !important"
    >
      <the-header></the-header>
      <the-main></the-main>
      <the-footer></the-footer>
    </el-container>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import TheMain from "../components/TheMain.vue";
import TheFooter from "../components/TheFooter.vue";
export default {
  components: {
    TheHeader,
    TheMain,
    TheFooter,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
