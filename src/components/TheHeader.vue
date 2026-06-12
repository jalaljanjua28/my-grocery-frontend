<template>
  <el-header class="header">
    <div class="header-background"></div>

    <!-- LEFT PILL: Logo + User/SignUp -->
    <div class="header-group brand-group">
      <header-logo class="logo-component"></header-logo>
      <div class="group-divider"></div>
      <the-menu></the-menu>
    </div>

    <!-- Spacer -->
    <div class="header-spacer"></div>

    <!-- RIGHT PILL: Search + Nav -->
    <div class="header-group utility-group">
      <div class="search-decoration">
        <div class="food-icon tomato" title="Search Inventory">
          <div class="icon-tooltip">Search</div>
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
      <div class="group-divider"></div>
      <the-nav></the-nav>
    </div>

    <div class="floating-food-icons">
      <div class="floating-icon strawberry"></div>
      <div class="floating-icon pineapple"></div>
      <div class="floating-icon grapes"></div>
      <div class="floating-icon watermelon"></div>
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
  components: { TheMenu, SearchInventory, HeaderLogo, TheNav },
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
      if (this.$el) this.$el.classList.add("loading");
      const { Food_expired, NonFood_expired } = await fetchMasterExpiredData();
      this.Food_expired = Food_expired;
      this.NonFood_expired = NonFood_expired;

      const { Food, NonFood } = await fetchShoppingListData();
      this.Food = Food;
      this.NonFood = NonFood;

      const { Food_nonexpired, NonFood_nonexpired } = await fetchMasterNonexpiredData();
      this.Food_nonexpired = Food_nonexpired;
      this.NonFood_nonexpired = NonFood_nonexpired;

      setTimeout(() => { if (this.$el) this.$el.classList.remove("loading"); }, 500);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  methods: {},
};
</script>

<style scoped>
/* ── Outer header bar ── */
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
    120deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(243, 251, 240, 0.95) 50%,
    rgba(237, 246, 255, 0.95) 100%
  );
  border-bottom: 1px solid rgba(103, 194, 58, 0.2);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.07);
  backdrop-filter: blur(12px);
  overflow: visible;
}

/* ── Animated gradient wash ── */
.header-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.25;
  background:
    radial-gradient(circle at 5%  50%, rgba(103,194,58,0.28), transparent 38%),
    radial-gradient(circle at 95% 50%, rgba(64,158,255,0.22), transparent 38%),
    radial-gradient(circle at 50% 110%, rgba(232,114,12,0.18), transparent 42%);
  animation: headerWash 9s ease-in-out infinite;
}

@keyframes headerWash {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}

/* ── Pill groups ── */
.header-group {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow:
    0 1px 4px rgba(0,0,0,0.06),
    inset 0 1px 0 rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.brand-group {
  border-color: rgba(103, 194, 58, 0.2);
}

.utility-group {
  flex-shrink: 1;
  min-width: 0;
}

/* ── Thin vertical divider inside a pill ── */
.group-divider {
  width: 1px;
  height: 24px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.12) 30%,
    rgba(0, 0, 0, 0.12) 70%,
    transparent
  );
  flex-shrink: 0;
}

/* ── Spacer pushes the two pills apart ── */
.header-spacer {
  flex: 1;
}

/* ── Search inside utility pill ── */
.searchDev {
  min-width: 0;
  flex: 1 1 180px;
}

/* ── Food icon decoration ── */
.search-decoration {
  flex-shrink: 0;
}

.food-icon {
  position: relative;
  width: 24px;
  height: 24px;
  border: 1.5px solid rgba(0, 0, 0, 0.6);
  background: rgba(255, 255, 255, 0.75);
  border-radius: 8px;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}

.icon-tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.18s, visibility 0.18s;
  pointer-events: none;
  z-index: 20;
}

.food-icon:hover .icon-tooltip {
  opacity: 1;
  visibility: visible;
}

/* ── Floating bg icons ── */
.floating-food-icons {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.floating-icon {
  position: absolute;
  width: 14px;
  height: 14px;
  border: 1.5px solid rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 0.55);
  border-radius: 5px;
  animation: floatBg 8s ease-in-out infinite;
  opacity: 0.5;
}

@keyframes floatBg {
  0%   { transform: translateY(0) rotate(0deg); }
  50%  { transform: translateY(-8px) rotate(6deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

/* ── Responsive ── */
@media (max-width: 660px) {
  .header {
    padding: 8px 12px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .brand-group {
    flex: 1;
    justify-content: center;
  }

  .utility-group {
    width: 100%;
    flex-basis: 100%;
    border-radius: 28px;
  }

  .header-spacer { display: none; }
  .search-decoration { display: none; }
  .floating-food-icons { display: none; }
}
</style>
