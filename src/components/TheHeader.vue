<template>
  <el-header class="header">
    <div class="header-background"></div>

    <!-- TOP ROW: Logo (left) + User/SignUp/Menu (right) -->
    <div class="top-row">
      <header-logo class="logo-component"></header-logo>

      <div class="right-actions">
        <the-menu></the-menu>
        <div class="vdivider"></div>
        <the-nav></the-nav>
      </div>
    </div>

    <!-- SEPARATOR -->
    <div class="row-separator"></div>

    <!-- BOTTOM ROW: Search full width -->
    <div class="bottom-row">
      <div class="food-icon tomato" title="Search">
        <div class="icon-tooltip">Search</div>
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
};
</script>

<style scoped>
/* ── Outer header ── */
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: auto !important;
  padding: 10px 20px 8px;
  display: flex;
  flex-direction: column;
  gap: 0;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0.97) 0%,
    rgba(243,251,240,0.97) 50%,
    rgba(237,246,255,0.97) 100%
  );
  border-bottom: 1px solid rgba(103,194,58,0.22);
  box-shadow: 0 2px 18px rgba(0,0,0,0.07);
  backdrop-filter: blur(12px);
  overflow: visible;
  box-sizing: border-box;
  width: 100%;
}

/* ── Animated wash ── */
.header-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.2;
  background:
    radial-gradient(circle at 5%  50%, rgba(103,194,58,0.28), transparent 36%),
    radial-gradient(circle at 95% 50%, rgba(64,158,255,0.22), transparent 36%),
    radial-gradient(circle at 50% 110%, rgba(232,114,12,0.16), transparent 40%);
  animation: headerWash 9s ease-in-out infinite;
}
@keyframes headerWash {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
}

/* ── Top row ── */
.top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 8px;
  position: relative;
  z-index: 1;
}

/* ── Right side of top row ── */
.right-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 12px;
  border-radius: 40px;
  background: rgba(255,255,255,0.72);
  border: 1px solid rgba(64,158,255,0.15);
  box-shadow: 0 1px 5px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
}

/* Vertical divider inside right-actions */
.vdivider {
  width: 1px;
  height: 20px;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.13) 30%, rgba(0,0,0,0.13) 70%, transparent);
  flex-shrink: 0;
}

/* ── Horizontal separator ── */
.row-separator {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(103,194,58,0.35) 15%,
    rgba(64,158,255,0.3) 50%,
    rgba(232,114,12,0.25) 85%,
    transparent 100%
  );
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

/* ── Bottom row: search ── */
.bottom-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding-top: 8px;
  position: relative;
  z-index: 1;
}

.searchDev {
  flex: 1 1 0;
  min-width: 0;
}

/* ── Tomato decoration ── */
.food-icon {
  position: relative;
  width: 22px;
  height: 22px;
  border: 1.5px solid rgba(0,0,0,0.5);
  background: rgba(255,255,255,0.8);
  border-radius: 7px;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  flex-shrink: 0;
}

.icon-tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.18s, visibility 0.18s;
  pointer-events: none;
  z-index: 20;
}
.food-icon:hover .icon-tooltip { opacity: 1; visibility: visible; }

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
  width: 13px;
  height: 13px;
  border: 1.5px solid rgba(0,0,0,0.3);
  background: rgba(255,255,255,0.45);
  border-radius: 4px;
  animation: floatBg 8s ease-in-out infinite;
  opacity: 0.4;
}
@keyframes floatBg {
  0%,100% { transform: translateY(0) rotate(0deg); }
  50%      { transform: translateY(-7px) rotate(5deg); }
}

/* ── Responsive ── */
@media (max-width: 600px) {
  .header { padding: 8px 12px 6px; }

  .right-actions {
    gap: 8px;
    padding: 4px 10px;
  }

  .floating-food-icons { display: none; }
  .food-icon { display: none; }
}
</style>
