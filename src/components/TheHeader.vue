<template>
  <el-header class="header">
    <!-- Animated gradient background -->
    <div class="header-background"></div>

    <!-- Left decoration with interactive food icons -->
    <div class="header-decoration left-decoration">
      <div class="food-icon apple" title="Fresh Produce">
        <div class="icon-tooltip">Fresh Produce</div>
      </div>
      <div class="food-icon carrot" title="Vegetables">
        <div class="icon-tooltip">Vegetables</div>
      </div>
    </div>

    <!-- Navigation component -->
    <the-nav class="nav-component"></the-nav>

    <!-- Logo with subtle animation -->
    <header-logo class="logo-component"></header-logo>

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

    <!-- Menu component -->
    <the-menu class="menu-component"></the-menu>

    <!-- Right decoration with interactive food icons -->
    <div class="header-decoration right-decoration">
      <div class="food-icon banana" title="Fruits">
        <div class="icon-tooltip">Fruits</div>
      </div>
      <div class="food-icon orange" title="Citrus">
        <div class="icon-tooltip">Citrus</div>
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
      document.querySelector(".header").classList.add("loading");

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
        document.querySelector(".header").classList.remove("loading");
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  z-index: 10;
  min-height: 90px;
  transition: all 0.5s ease;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

/* Loading animation for header */
.header.loading {
  background-color: #f9f9f9;
}

.header.loading::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

/* Animated gradient background */
.header-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(240, 249, 255, 0.95) 50%,
    rgba(230, 245, 255, 0.95) 100%
  );
  z-index: -2;
}

/* Add a subtle food pattern background */
.header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+");
  opacity: 0.4;
  z-index: -1;
}

/* Header decorations */
.header-decoration {
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1;
  padding: 10px;
  border-radius: 15px;
  transition: all 0.3s ease;
}

.header-decoration:hover {
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.left-decoration {
  margin-right: 15px;
  margin-right: 8px;
  margin-left: 62px;
}

.right-decoration {
  margin-left: 15px;
}

/* Search container with decorations */
.search-container {
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 600px;
  margin: 0 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 30px;
  padding: 5px 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.search-container:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.search-decoration {
  margin: 0 10px;
  position: relative;
}

.searchDev {
  flex: 1;
}

/* Component styling */
/* .nav-component,
.logo-component,
.menu-component {
  transition: all 0.3s ease;
}

.nav-component:hover,
.logo-component:hover,
.menu-component:hover {
  transform: translateY(-2px);
} */

/* Food icons */
.food-icon {
  width: 35px;
  height: 35px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.8;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.food-icon:hover {
  transform: rotate(15deg) scale(1.2);
  opacity: 1;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.2));
}

/* Tooltip for food icons */
.icon-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 100;
}

.food-icon:hover .icon-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: calc(100% + 10px);
}

/* Floating food icons background */
.floating-food-icons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.floating-icon {
  position: absolute;
  width: 25px;
  height: 25px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.08;
  filter: blur(1px);
  transition: opacity 0.5s ease;
}

.header:hover .floating-icon {
  opacity: 0.12;
}

/* Position the floating icons */
.strawberry {
  top: 15%;
  left: 10%;
  animation: float 12s ease-in-out infinite, rotate 30s linear infinite;
}

.pineapple {
  top: 60%;
  left: 25%;
  animation: float 15s ease-in-out infinite, rotate 40s linear infinite;
}

.grapes {
  top: 30%;
  left: 60%;
  animation: float 14s ease-in-out infinite, rotate 35s linear infinite;
}

.watermelon {
  top: 70%;
  left: 75%;
  animation: float 16s ease-in-out infinite, rotate 45s linear infinite;
}

.peach {
  top: 20%;
  left: 85%;
  animation: float 13s ease-in-out infinite, rotate 38s linear infinite;
}

/* Animation for floating elements */
@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-15px) translateX(5px);
  }
  50% {
    transform: translateY(0) translateX(10px);
  }
  75% {
    transform: translateY(15px) translateX(5px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Food icon images with higher quality and consistent style */
.apple {
  background-image: url("https://cdn-icons-png.flaticon.com/512/415/415682.png");
}

.banana {
  background-image: url("https://cdn-icons-png.flaticon.com/512/3143/3143693.png");
}

.orange {
  background-image: url("https://cdn-icons-png.flaticon.com/512/3143/3143645.png");
}

.carrot {
  background-image: url("https://cdn-icons-png.flaticon.com/512/1147/1147801.png");
}

.broccoli {
  background-image: url("https://cdn-icons-png.flaticon.com/512/1147/1147809.png");
}

.tomato {
  background-image: url("https://cdn-icons-png.flaticon.com/512/590/590772.png");
}

.strawberry {
  background-image: url("https://cdn-icons-png.flaticon.com/512/2965/2965567.png");
}

.pineapple {
  background-image: url("https://cdn-icons-png.flaticon.com/512/3143/3143640.png");
}

.grapes {
  background-image: url("https://cdn-icons-png.flaticon.com/512/2909/2909761.png");
}

.watermelon {
  background-image: url("https://cdn-icons-png.flaticon.com/512/3143/3143665.png");
}

.peach {
  background-image: url("https://cdn-icons-png.flaticon.com/512/2909/2909838.png");
}

/* Responsive adjustments */
@media screen and (max-width: 1024px) {
  .header {
    padding: 0 15px;
  }

  .food-icon {
    width: 30px;
    height: 30px;
  }

  .search-container {
    max-width: 450px;
  }
}

@media screen and (max-width: 768px) {
  .header {
    padding: 0 10px;
    min-height: 80px;
  }

  .header-decoration {
    display: none;
  }

  .search-decoration {
    display: none;
  }

  .search-container {
    margin: 0 10px;
    max-width: 100%;
    padding: 3px 8px;
  }

  .floating-icon {
    width: 20px;
    height: 20px;
  }
}

@media screen and (max-width: 600px) {
  .header {
    flex-wrap: wrap;
    padding: 10px;
    justify-content: center;
    min-height: auto;
  }

  .logo-component {
    order: 1;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }

  .nav-component {
    order: 2;
    margin-right: 10px;
  }

  .menu-component {
    order: 3;
    margin-left: 10px;
  }

  .search-container {
    order: 4;
    width: 100%;
    margin: 10px 0 0;
  }

  .floating-food-icons {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .header {
    border-radius: 0;
  }

  .nav-component,
  .menu-component {
    transform: scale(0.9);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .header {
    background-color: #1a1a1a;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .header-background {
    background: linear-gradient(
      135deg,
      rgba(30, 30, 30, 0.95) 0%,
      rgba(40, 40, 40, 0.95) 50%,
      rgba(35, 35, 35, 0.95) 100%
    );
  }

  .header::before {
    opacity: 0.2;
  }

  .header-decoration:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .search-container {
    background-color: rgba(50, 50, 50, 0.8);
  }

  .floating-icon {
    opacity: 0.15;
  }

  .header:hover .floating-icon {
    opacity: 0.2;
  }
}

/* Print styles */
@media print {
  .header {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    box-shadow: none;
    border-bottom: 1px solid #ddd;
    min-height: auto;
  }

  .header-background,
  .header::before,
  .header-decoration,
  .search-container,
  .nav-component,
  .menu-component,
  .floating-food-icons {
    display: none;
  }

  .logo-component {
    transform: none;
  }
}

/* Additional visual enhancements */

/* Subtle hover effect for the entire header */
.header:hover {
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
}

/* Pulsing animation for the search container when focused */
.search-container:focus-within {
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.3);
  animation: pulse-border 2s infinite;
}

@keyframes pulse-border {
  0% {
    box-shadow: 0 0 0 0 rgba(64, 158, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(64, 158, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(64, 158, 255, 0);
  }
}

/* Food icon hover effects with 3D rotation */
.food-icon:hover {
  transform: rotate(15deg) scale(1.2) translateZ(10px);
  opacity: 1;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2));
}

/* Animated gradient border for the header on hover */
.header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(
    90deg,
    #ff9a9e 0%,
    #fad0c4 25%,
    #fad0c4 50%,
    #a1c4fd 75%,
    #c2e9fb 100%
  );
  background-size: 200% 100%;
  animation: gradient-shift 15s ease infinite;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.header:hover::after {
  opacity: 1;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Seasonal themes - can be toggled based on time of year */
.header.spring {
  background-color: #f8fff8;
}

.header.summer {
  background-color: #fffcf5;
}

.header.autumn {
  background-color: #fff8f5;
}

.header.winter {
  background-color: #f5f8ff;
}

/* Accessibility improvements */
.food-icon:focus {
  outline: 2px solid #409eff;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (forced-colors: active) {
  .header {
    border-bottom: 2px solid CanvasText;
  }

  .food-icon {
    forced-color-adjust: none;
  }
}
</style>
