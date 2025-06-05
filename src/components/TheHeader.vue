<template>
  <el-header class="header">
    <!-- Animated gradient background -->
    <div class="header-background"></div>

    <!-- Left decoration with interactive food icons -->
    <div class="header-decoration left-decoration">
      <div class="header-decoration-content">
        <div class="food-icon apple" title="Fresh Produce">
          <div class="icon-tooltip">Fresh Produce</div>
        </div>
        <div class="food-icon carrot" title="Vegetables">
          <div class="icon-tooltip">Vegetables</div>
        </div>
      </div>
      <header-logo class="logo-component"></header-logo>
    </div>

    <!-- Navigation component -->
    <!-- <the-nav class="nav-component"></the-nav> -->
    <!-- Enhanced search container with animations -->
    <div class="search-container">
      <div class="search-decoration">
        <div class="food-icon tomato" title="Search Inventory">
          <div class="icon-tooltip">Search Inventory</div>
        </div>
      </div>
      <search-inventory
        class="searchDev"
        :ExpiredFood="Food_expired"
        :ExpiredNonFood="NonFood_expired"
        :NonExpiredFood="Food_nonexpired"
        :NonExpiredNonFood="NonFood_nonexpired"
        :itemsFood="Food"
        :itemsNonFood="NonFood"
      ></search-inventory>
      <div class="search-decoration">
        <div class="food-icon broccoli" title="Healthy Options">
          <div class="icon-tooltip">Healthy Options</div>
        </div>
      </div>
    </div>

    <!-- Right decoration with interactive food icons -->
    <div class="header-decoration right-decoration">
      <the-menu class="menu-component"></the-menu>

      <div class="header-decoration-content">
        <!-- Menu component -->
        <div>
          <div class="food-icon banana" title="Fruits">
            <div class="icon-tooltip">Fruits</div>
          </div>
          <div class="food-icon orange" title="Citrus">
            <div class="icon-tooltip">Citrus</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Floating food icons background with enhanced animations -->
    <div class="floating-food-icons">
      <div class="floating-icon strawberry" title="Berries"></div>
      <div class="floating-icon pineapple" title="Tropical Fruits"></div>
      <div class="floating-icon grapes" title="Grapes"></div>
      <div class="floating-icon watermelon" title="Melons"></div>
      <div class="floating-icon peach" title="Stone Fruits"></div>
    </div>
  </el-header>
</template>

<script>
import TheMenu from "./TheMenu.vue";
import SearchInventory from "./SearchInventory.vue";
// import TheNav from "./TheNav.vue";
import {
  fetchMasterExpiredData,
  fetchShoppingListData,
  fetchMasterNonexpiredData,
} from "@/plugins/Dataservice.js";
import HeaderLogo from "./HeaderLogo.vue";
export default {
  components: {
    TheMenu,
    SearchInventory,
    HeaderLogo,
    // TheNav,
  },
  data() {
    return {
      Food_expired: [],
      Food_nonexpired: [],
      NonFood_nonexpired: [],
      NonFood_expired: [],
      Food: [],
      NonFood: [],
    };
  },

  async mounted() {
    try {
      // Add a subtle loading animation to the header
      // Use this.$el to reliably access the component's root element
      if (this.$el) {
        this.$el.classList.add("loading");
      }

      // Fetch master expired data
      const { Food_expired, NonFood_expired } = await fetchMasterExpiredData();
      this.Food_expired = Food_expired;
      this.NonFood_expired = NonFood_expired;

      // Fetch shopping list data
      const { Food, NonFood } = await fetchShoppingListData();
      this.Food = Food;
      this.NonFood = NonFood;

      // Fetch master nonexpired data
      const { Food_nonexpired, NonFood_nonexpired } =
        await fetchMasterNonexpiredData();
      this.Food_nonexpired = Food_nonexpired;
      this.NonFood_nonexpired = NonFood_nonexpired;

      // Remove loading animation when data is loaded
      setTimeout(() => {
        // Use this.$el again
        if (this.$el) {
          this.$el.classList.remove("loading");
        }
      }, 500);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  methods: {},
};
</script>

<style scoped></style>
