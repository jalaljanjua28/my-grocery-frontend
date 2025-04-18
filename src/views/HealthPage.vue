<template>
  <div>
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

    <el-main class="main-content">
      <div class="nav-buttons">
        <router-link to="/recipes-page" class="router_link">
          <el-button class="nav-button" type="info" plain
            ><i class="el-icon-chicken"></i> Recipes
          </el-button>
        </router-link>
        <router-link to="/items-inventory" class="router_link">
          <el-button class="nav-button" type="info" plain
            ><i class="el-icon-no-smoking"></i> Health
          </el-button>
        </router-link>
        <router-link to="user-defined-prompt" class="router_link">
          <el-button class="nav-button" type="info" plain
            ><i class="el-icon-s-order"></i> User Defined Prompt
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
<style scoped>
.nav-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}
/* Navigation buttons - custom styling */
.nav-button {
  font-size: large;
  padding: 12px 20px;
  color: #303133;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.nav-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.nav-button i {
  margin-right: 8px;
  font-size: 18px;
}
</style>
