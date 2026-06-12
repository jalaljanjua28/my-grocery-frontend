<template>
  <el-header class="header">
    <div class="header-background"></div>

    <!-- Far left: User & SignUp -->
    <div class="user-section">
      <the-menu></the-menu>
    </div>

    <!-- Logo -->
    <header-logo class="logo-component"></header-logo>

    <!-- Center: Search bar -->
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

    <!-- Far right: Nav / hamburger -->
    <div class="nav-section">
      <the-nav></the-nav>
    </div>

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
      if (this.$el) {
        this.$el.classList.add("loading");
      }
      const { Food_expired, NonFood_expired } = await fetchMasterExpiredData();
      this.Food_expired = Food_expired;
      this.NonFood_expired = NonFood_expired;

      const { Food, NonFood } = await fetchShoppingListData();
      this.Food = Food;
      this.NonFood = NonFood;

      const { Food_nonexpired, NonFood_nonexpired } =
        await fetchMasterNonexpiredData();
      this.Food_nonexpired = Food_nonexpired;
      this.NonFood_nonexpired = NonFood_nonexpired;

      setTimeout(() => {
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
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: auto !important;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.92) 0%,
    rgba(240, 248, 235, 0.92) 50%,
    rgba(232, 244, 255, 0.92) 100%
  );
  border-bottom: 1px solid rgba(103, 194, 58, 0.25);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(103, 194, 58, 0.12);
  backdrop-filter: blur(10px);
  overflow: visible;
}

/* Animated background layer */
.header-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.3;
  background: radial-gradient(
      circle at 8% 50%,
      rgba(103, 194, 58, 0.2),
      transparent 35%
    ),
    radial-gradient(
      circle at 92% 50%,
      rgba(64, 158, 255, 0.18),
      transparent 35%
    ),
    radial-gradient(
      circle at 50% 100%,
      rgba(229, 162, 60, 0.15),
      transparent 40%
    );
  animation: headerFloat 8s ease-in-out infinite;
}

@keyframes headerFloat {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}

/* Far-left user/signup section */
.user-section {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  z-index: 1;
}

/* Logo */
.logo-component {
  flex-shrink: 0;
  z-index: 1;
}

/* Center search — grows to fill remaining space */
.search-header {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 4px 0;
  z-index: 1;
}

/* Far-right nav/hamburger section */
.nav-section {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  z-index: 1;
}

/* Food icon decorations */
.food-icon {
  position: relative;
  width: 26px;
  height: 26px;
  border: 2px solid rgba(0, 0, 0, 0.65);
  background: rgba(255, 255, 255, 0.75);
  border-radius: 10px;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.82);
  color: #fff;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  z-index: 10;
}

.food-icon:hover .icon-tooltip {
  opacity: 1;
  visibility: visible;
}

/* Floating background icons */
.floating-food-icons {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-icon {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background: rgba(255, 255, 255, 0.6);
  border-radius: 6px;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.08);
  animation: floatingIcon 7s ease-in-out infinite;
}

@keyframes floatingIcon {
  0%   { transform: translateY(0) rotate(0deg);   opacity: 0.5; }
  50%  { transform: translateY(-9px) rotate(8deg); opacity: 0.85; }
  100% { transform: translateY(0) rotate(0deg);   opacity: 0.5; }
}

/* Responsive */
@media (max-width: 640px) {
  .header {
    padding: 8px 12px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .user-section {
    order: 1;
  }

  .logo-component {
    order: 2;
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .nav-section {
    order: 3;
  }

  .search-header {
    order: 4;
    width: 100%;
    flex-basis: 100%;
  }

  .search-decoration {
    display: none;
  }

  .floating-food-icons {
    display: none;
  }

  .header-background {
    opacity: 0.15;
  }

  .icon-tooltip {
    display: none;
  }
}
</style>
