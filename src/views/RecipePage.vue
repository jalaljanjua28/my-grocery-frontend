<template>
  <div class="recipe-prompts-container">
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Recipe Page" class="custom-page-header">
        <template slot="content">
          <div class="page-title">
            <i class="el-icon-food"></i>
            <span> Recipe Page</span>
          </div>
        </template>
      </el-page-header>
    </router-link>
    <el-main class="main-content">
      <div class="nav-buttons">
        <router-link to="/items-inventory" class="router_link">
          <el-button class="nav-button" type="info" plain
            ><i class="el-icon-inventory"></i> Items Inventory
          </el-button>
        </router-link>
        <router-link to="/health-page" class="router_link">
          <el-button class="nav-button" type="success" plain
            ><i class="el-icon-no-smoking"></i> Health
          </el-button>
        </router-link>
        <router-link to="user-defined-prompt" class="router_link">
          <el-button class="nav-button" type="warning" plain
            ><i class="el-icon-s-order"></i> User Defined Prompt
          </el-button>
        </router-link>
      </div>
      <recipe-prompt></recipe-prompt>
    </el-main>
  </div>
</template>

<script>
import RecipePrompt from "../components/RecipePrompts.vue";
export default {
  components: {
    RecipePrompt,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
