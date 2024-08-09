<template>
  <el-main class="main-content">
    <home-page></home-page>
    <br />
    <dummy-component class="barcode" ref="DummyComponent" />
  </el-main>
</template>

<script>
import HomePage from "../views/HomePage.vue";
import DummyComponent from "@/components/DummyComponent.vue";

export default {
  components: {
    DummyComponent,
    HomePage,
  },
  data() {
    return {};
  },
  async mounted() {
    this.$refs.DummyComponent.simulateUpload();
    console.log("simulateUpload function triggered in DummyComponent.vue");
  },
};
</script>

<style scoped></style>
