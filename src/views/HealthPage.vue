<template>
  <div class="health-prompts-container">
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Items Inventory" class="custom-page-header">
        <template slot="content">
          <div class="page-title">
            <i class="el-icon-no-smoking"></i>
            <span>Health Page</span>
          </div>
        </template>
      </el-page-header>
    </router-link>
    <div class="nav-buttons">
      <router-link to="/recipes-page" class="router_link">
        <el-button class="nav-button" type="info" plain
          ><i class="el-icon-chicken"></i> Recipes
        </el-button>
      </router-link>
      <router-link to="/items-inventory" class="router_link">
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
    <health-prompt></health-prompt>
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
