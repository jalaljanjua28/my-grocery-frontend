<template>
  <div id="app">
    <el-container
      style="height: 163vh; width: -webkit-fill-available !important"
    >
      <the-nav></the-nav>
      <el-container>
        <the-header></the-header>
        <the-main></the-main>
        <the-footer></the-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import TheMain from "../components/TheMain.vue";
import TheFooter from "../components/TheFooter.vue";
import TheNav from "@/components/TheNav.vue";
export default {
  components: {
    TheHeader,
    TheMain,
    TheFooter,
    TheNav,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
