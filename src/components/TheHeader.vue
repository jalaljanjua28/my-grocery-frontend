<template>
  <el-header class="header">
    <!-- Animated gradient background -->
    <div class="header-background"></div>
    <!-- Left decoration with interactive food icons -->
    <header-logo class="logo-component"></header-logo>
    <div class="menu-nav"><the-menu></the-menu> <the-nav></the-nav></div>

    <!-- Navigation component -->
    <!-- Enhanced search container with animations -->
    <div class="search-header">
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
import TheNav from "./TheNav.vue";
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
    TheNav,
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

<style scoped>
/* Header layout */
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: auto;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(245, 247, 250, 0.72);
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(6px);
  overflow: hidden;
}
.menu-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
/* Animated background layer */
.header-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  background: radial-gradient(
      circle at 10% 10%,
      rgba(103, 194, 58, 0.25),
      transparent 40%
    ),
    radial-gradient(
      circle at 90% 20%,
      rgba(64, 158, 255, 0.25),
      transparent 40%
    ),
    radial-gradient(
      circle at 50% 90%,
      rgba(229, 162, 60, 0.22),
      transparent 45%
    );
  animation: headerFloat 8s ease-in-out infinite;
}

@keyframes headerFloat {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}

/* Left + menu + search containers inside the header */
.search-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 8px 0;
}

/* Food icon rows */
.floating-food-icons {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-icon {
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(0, 0, 0, 0.6);
  background: rgba(255, 255, 255, 0.65);
  border-radius: 6px;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.12);
  animation: floatingIcon 7s ease-in-out infinite;
}

@keyframes floatingIcon {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px) rotate(10deg);
    opacity: 0.95;
  }
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.6;
  }
}

/* Use titles as tooltip targets already; we style the tooltip */
.icon-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  z-index: 10;
}

.food-icon {
  position: relative;
  width: 26px;
  height: 26px;
  border: 2px solid rgba(0, 0, 0, 0.75);
  background: rgba(255, 255, 255, 0.72);
  border-radius: 10px;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.food-icon:hover .icon-tooltip {
  opacity: 1;
  visibility: visible;
}

/* Responsive: keep search readable on small screens */
@media (max-width: 600px) {
  .header {
    padding: 10px 12px;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 10px;
    min-height: auto;
  }

  .logo-component {
    align-self: center;
    margin-bottom: 2px;
  }

  .menu-nav {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    order: 2;
  }

  .menu-nav > * {
    width: 100%;
  }

  .search-header {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 8px;
    padding: 4px 0 0;
    order: 3;
  }

  .search-decoration {
    display: none;
  }

  .searchDev {
    width: 100%;
  }

  .food-icon {
    width: 22px;
    height: 22px;
  }

  .floating-food-icons {
    display: none;
  }

  .header-background {
    opacity: 0.18;
  }

  .icon-tooltip {
    display: none;
  }
}
</style>
