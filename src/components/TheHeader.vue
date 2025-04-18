<template>
  <el-header class="header">
    <div class="header-decoration left-decoration">
      <div class="food-icon apple"></div>
      <div class="food-icon carrot"></div>
    </div>
    <the-nav></the-nav>
    <header-logo></header-logo>

    <div class="search-container">
      <div class="search-decoration">
        <div class="food-icon tomato"></div>
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
        <div class="food-icon broccoli"></div>
      </div>
    </div>

    <the-menu></the-menu>

    <div class="header-decoration right-decoration">
      <div class="food-icon banana"></div>
      <div class="food-icon orange"></div>
    </div>

    <!-- Floating food icons background -->
    <div class="floating-food-icons">
      <div class="floating-icon strawberry"></div>
      <div class="floating-icon pineapple"></div>
      <div class="floating-icon grapes"></div>
      <div class="floating-icon watermelon"></div>
      <div class="floating-icon peach"></div>
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
  padding: 0 0px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  z-index: 10;
  min-height: 90px;
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
  opacity: 0.6;
  z-index: -1;
}

/* Header decorations */
.header-decoration {
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1;
}

.left-decoration {
  margin-right: 10px;
}

.right-decoration {
  margin-left: 10px;
}

/* Search container with decorations */
.search-container {
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 600px;
  margin: 0 20px;
}

.search-decoration {
  margin: 0 10px;
}

.searchDev {
  flex: 1;
}

/* Food icons */
.food-icon {
  width: 30px;
  height: 30px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.food-icon:hover {
  transform: rotate(15deg) scale(1.2);
  opacity: 1;
}

/* Floating food icons in background */
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
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.1;
}

/* Position the floating icons */
.strawberry {
  top: 15%;
  left: 10%;
  animation: float 8s ease-in-out infinite;
}

.pineapple {
  top: 60%;
  left: 25%;
  animation: float 10s ease-in-out infinite;
}

.grapes {
  top: 30%;
  left: 60%;
  animation: float 9s ease-in-out infinite;
}

.watermelon {
  top: 70%;
  left: 75%;
  animation: float 11s ease-in-out infinite;
}

.peach {
  top: 20%;
  left: 85%;
  animation: float 7s ease-in-out infinite;
}

/* Animation for floating elements */
@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

/* Food icon images */
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
@media screen and (max-width: 768px) {
  .header-decoration {
    display: none;
  }

  .search-decoration {
    display: none;
  }

  .search-container {
    margin: 0 10px;
  }
}

@media screen and (max-width: 480px) {
  .floating-food-icons {
    display: none;
  }

  .header {
    padding: 0 10px;
  }
}
</style>
