<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Health Page"> </el-page-header>
    </router-link>

    <el-main class="main-content">
      <div
        class="nav-buttons"
        style="
          display: flex;
          align-items: center;
          background-color: darkcyan;
          border-radius: 10px;
          padding: 0px;
          border: 2px solid black;
        "
      >
        <router-link to="items-inventory" class="router_link">
          <el-button
            style="
              font-size: x-large;
              background-color: darkcyan;
              border: none;
              padding: 12px;
              color: white;
            "
            ><i class="el-icon-goods"> Items</i>
          </el-button>
        </router-link>
        <router-link to="/recipes-page" class="router_link">
          <el-button
            style="
              font-size: x-large;
              background-color: darkcyan;
              border: none;
              padding: 12px;
              color: white;
            "
            ><i class="el-icon-chicken"> Recipes</i>
          </el-button>
        </router-link>

        <router-link to="user-defined-prompt" class="router_link">
          <el-button
            style="
              font-size: x-large;
              background-color: darkcyan;
              border: none;
              padding: 12px;
              color: white;
            "
            ><i class="el-icon-s-order"> User Defined Prompt</i>
          </el-button>
        </router-link>
      </div>
      <health-prompt></health-prompt>
    </el-main>
  </div>
</template>

<script>
import HealthPrompt from "../components/HealthPrompts.vue";
export default {
  components: {
    HealthPrompt,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped></style>
