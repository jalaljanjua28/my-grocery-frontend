<template>
  <div class="home-page-container">
    <!-- Decorative food-themed header -->
    <div class="decorative-food-header">
      <div class="food-icon apple"></div>
      <div class="food-icon banana"></div>
      <div class="food-icon carrot"></div>
      <div class="food-icon broccoli"></div>
      <div class="food-icon orange"></div>
    </div>

    <div class="search-HomeContainer">
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
      />
      <div class="search-decoration">
        <div class="food-icon broccoli" title="Healthy Options">
          <div class="icon-tooltip">Healthy Options</div>
        </div>
      </div>
    </div>

    <div class="nav-buttons">
      <router-link to="items-inventory" class="router_link">
        <el-button class="nav-button" type="success" plain
          ><i class="el-icon-goods"></i> Items
        </el-button>
      </router-link>
      <router-link to="/recipes-page" class="router_link">
        <el-button class="nav-button" type="warning" plain
          ><i class="el-icon-chicken"></i> Recipes
        </el-button>
      </router-link>
      <router-link to="/health-page" class="router_link">
        <el-button class="nav-button" type="primary" plain
          ><i class="el-icon-no-smoking"></i> Health
        </el-button>
      </router-link>
      <router-link to="user-defined-prompt" class="router_link">
        <el-button class="nav-button" type="info" plain
          ><i class="el-icon-s-order"></i> User Defined Prompt
        </el-button>
      </router-link>
    </div>

    <div v-if="displayJokes" class="jokes-container">
      <el-card class="jokes-box">
        <div class="jokes-header">
          <div class="food-icon strawberry"></div>
          <h2>Joke of the Day</h2>
          <div class="food-icon pineapple"></div>
        </div>
        <div class="joke-item">
          <p class="joke-text">{{ jokes["Food Joke"] }}</p>
        </div>
      </el-card>
    </div>

    <!-- <offers-page></offers-page> -->
    <el-card class="main-content-card">
      <div class="card-decoration left-decoration">
        <div class="food-icon tomato"></div>
        <div class="food-icon grapes"></div>
        <div class="food-icon avocado"></div>
      </div>

      <section>
        <el-tabs
          v-model="outerActiveTab"
          @tab-click="handleOuterTabClick"
          class="custom-tabs"
        >
          <el-tab-pane name="Food" label="Food">
            <span slot="label" class="el-tabs__label">
              <i class="el-icon-food"></i> Food
            </span>
            <div>
              <purchased-list
                :filteredItems="Food_nonexpired"
                :active-tab="outerActiveTab"
                @item-deleted="handleItemDeleted()"
              ></purchased-list>
            </div>
          </el-tab-pane>
          <el-tab-pane name="Not_Food" label="Not Food">
            <span slot="label" class="el-tabs__label">
              <i class="el-icon-bicycle"></i> Non Food / Unrecognized
            </span>
            <div>
              <purchased-list
                :active-tab="outerActiveTab"
                :filteredItems="NonFood_nonexpired"
                @item-deleted="handleItemDeleted()"
              ></purchased-list>
            </div>
          </el-tab-pane>
        </el-tabs>
      </section>

      <delete-all-purchase-list></delete-all-purchase-list>

      <div class="card-decoration right-decoration">
        <div class="food-icon watermelon"></div>
        <div class="food-icon peach"></div>
        <div class="food-icon potato"></div>
      </div>
    </el-card>

    <home-prompt></home-prompt>

    <!-- Decorative food-themed footer -->
    <div class="decorative-food-footer">
      <div class="food-icon mango"></div>
      <div class="food-icon cherry"></div>
      <div class="food-icon lemon"></div>
      <div class="food-icon corn"></div>
      <div class="food-icon mushroom"></div>
    </div>
  </div>
</template>

<script>
// import OffersPage from "@/views/OffersList.vue";
import HomePrompt from "../components/HomePrompts.vue";
import PurchasedList from "../components/PurchasedList.vue";
import DeleteAllPurchaseList from "../components/DeleteAllPurchaseList.vue";
import {
  fetchPurchasedListData,
  fetchMasterExpiredData,
  fetchShoppingListData,
} from "@/plugins/Dataservice.js";
import SearchInventory from "../components/SearchInventory.vue";
import { auth } from "../Firebase.js";

const baseUrl = "http://127.0.0.1:8081/api";

export default {
  components: {
    // OffersPage,
    HomePrompt,
    PurchasedList,
    DeleteAllPurchaseList,
    SearchInventory,
  },
  data() {
    return {
      loading: false,
      outerActiveTab: "Food",
      jokes: [],
      displayJokes: false,
      Food: [],
      NonFood: [],
      Food_nonexpired: [],
      NonFood_nonexpired: [],
      item: [],
      currentUser: null,
    };
  },
  computed: {
    filteredItems() {
      console.log(this.items);
      return this.items.filter((item) => item && item.category);
    },
  },
  async mounted() {
    try {
      const { Food_nonexpired, NonFood_nonexpired } =
        await fetchPurchasedListData();
      this.Food_nonexpired = Food_nonexpired;
      this.NonFood_nonexpired = NonFood_nonexpired;
      const { Food_expired, NonFood_expired } = await fetchMasterExpiredData();
      this.Food_expired = Food_expired;
      this.NonFood_expired = NonFood_expired;
      const { Food, NonFood } = await fetchShoppingListData();
      this.Food = Food;
      this.NonFood = NonFood;
      // await this.jsonJokes();
      this.fetchJokesWithTimestamp();

      setInterval(() => {
        this.fetchJokesWithTimestamp();
      }, 3600000); // 3600000 milliseconds = 1 hour
    } catch (error) {
      console.error("Error loading data:", error);
    }
  },
  created() {
    // Retrieve the active tab from local storage on page load
    const storedOuterTab = localStorage.getItem("activeOuterTab");
    console.log(storedOuterTab);
    const storedInnerTab = localStorage.getItem("activeInnerTab");
    console.log(storedInnerTab);
    if (storedOuterTab && storedInnerTab) {
      this.outerActiveTab = storedOuterTab;
      this.innerActiveTab = storedInnerTab;
    }
    this.outerActiveTab = "Food"; // "a" corresponds to the "Non Expired" tab

    // Store these values in localStorage
    localStorage.setItem("activeOuterTab", this.outerActiveTab);
  },
  methods: {
    handleItemDeleted(itemToDelete) {
      this.items = this.items.filter((item) => item !== itemToDelete);
      // You can access the deleted item and target tab name here
      console.log("Deleted Item:", itemToDelete);
      // Update the active tab when an item is deleted
    },
    handleOuterTabClick(tab) {
      // Update the local storage on outer tab change
      localStorage.setItem("activeOuterTab", tab.name);
      this.outerActiveTab = tab.name; // Update the active tab when clicked

      console.log("Outer Tab: " + this.outerActiveTab);
    },
    async fetchJokesWithTimestamp() {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        const idToken = await currentUser.getIdToken(/* forceRefresh */ true);

        const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
        const response = await fetch(
          `${baseUrl}/jokes-with-timestamp/${timestamp}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.jokes && data.jokes.length > 0) {
          this.jokes = data.jokes[0]; // Set only the first joke
          this.displayJokes = true;
        } else {
          this.errorMessage = "Error retrieving jokes.";
        }
      } catch (error) {
        console.error("Error in fetchJokesWithTimestamp:", error);
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style scoped>
.search-HomeContainer {
  background-color: rgba(50, 50, 50, 0.8) !important;
}
.el-page-header {
  display: none !important;
}
.searchDev {
  flex: 1;
}
/* Search container with decorations */
.search-HomeContainer {
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 600px;
  margin: 0 -17px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 30px;
  padding: 7px 2px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}
/* Pulsing animation for the search container when focused */
.search-HomeContainer:focus-within {
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.3);
  animation: pulse-border 2s infinite;
}
.search-HomeContainer:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
.search-HomeContainer {
  /* max-width: 450px; */
  margin-bottom: 20px;
}
.search-decoration {
  margin: 0 10px;
  position: relative;
}
.home-page-container {
  position: relative;
  padding: 20px;
  background-color: #f9f9f9;
  overflow: hidden;
}

/* Background pattern */
.home-page-container::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+");
  opacity: 0.6;
  z-index: -1;
}

/* Decorative food headers and footers */
.decorative-food-header,
.decorative-food-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px auto 30px;
  max-width: 800px;
}

.decorative-food-footer {
  margin: 30px auto 10px;
}

/* Food icons */
.food-icon {
  width: 40px;
  height: 40px;
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

/* Jokes container */
.jokes-container {
  margin: 30px auto;
  max-width: 600px;
}

.jokes-box {
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow: hidden;
  border: none;
}

.jokes-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #f0f9eb;
  border-bottom: 1px solid #e1f3d8;
}

.jokes-header h2 {
  margin: 0 15px;
  color: #67c23a;
}

.joke-item {
  padding: 20px;
  text-align: center;
}

.joke-text {
  font-size: 18px;
  line-height: 1.6;
  color: #606266;
  font-style: italic;
}

/* Main content card */
.main-content-card {
  position: relative;
  margin: 30px 0;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border: none;
  overflow: visible;
}

/* Card decorations */
.card-decoration {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1;
}

.left-decoration {
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
}

.right-decoration {
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
}

/* Custom tabs */
.custom-tabs {
  margin-bottom: 20px;
}

.el-tabs__label {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.el-tabs__label i {
  margin-right: 8px;
  font-size: 18px;
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

.avocado {
  background-image: url("https://cdn-icons-png.flaticon.com/512/2909/2909761.png");
}

.watermelon {
  background-image: url("https://cdn-icons-png.flaticon.com/512/3143/3143665.png");
}

.peach {
  background-image: url("https://cdn-icons-png.flaticon.com/512/2909/2909838.png");
}

.potato {
  background-image: url("https://cdn-icons-png.flaticon.com/512/1652/1652077.png");
}

.mango {
  background-image: url("https://cdn-icons-png.flaticon.com/512/1625/1625099.png");
}

.cherry {
  background-image: url("https://cdn-icons-png.flaticon.com/512/590/590775.png");
}

.lemon {
  background-image: url("https://cdn-icons-png.flaticon.com/512/590/590774.png");
}

.corn {
  background-image: url("https://cdn-icons-png.flaticon.com/512/1147/1147803.png");
}

.mushroom {
  background-image: url("https://cdn-icons-png.flaticon.com/512/1147/1147807.png");
}

/* Animation for decorative elements */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.decorative-food-header .food-icon,
.decorative-food-footer .food-icon {
  animation: float 5s ease-in-out infinite;
}

.decorative-food-header .food-icon:nth-child(odd),
.decorative-food-footer .food-icon:nth-child(odd) {
  animation-delay: 1s;
}

.decorative-food-header .food-icon:nth-child(even),
.decorative-food-footer .food-icon:nth-child(even) {
  animation-delay: 2s;
}

.card-decoration .food-icon {
  animation: float 6s ease-in-out infinite;
}

.card-decoration .food-icon:nth-child(1) {
  animation-delay: 0s;
}

.card-decoration .food-icon:nth-child(2) {
  animation-delay: 2s;
}

.card-decoration .food-icon:nth-child(3) {
  animation-delay: 4s;
}
.el-button--success.is-plain {
  width: 100% !important;
}
.el-button--primary.is-plain {
  width: 100% !important;
}
/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .card-decoration {
    display: none;
  }
  /* .search-HomeContainer {
    margin: 0 10px;
    max-width: 100%;
    padding: 3px 8px;
  } */

  .decorative-food-header,
  .decorative-food-footer {
    max-width: 100%;
  }

  .food-icon {
    width: 30px;
    height: 30px;
  }

  .nav-button {
    font-size: medium;
    padding: 10px 15px;
  }

  .joke-text {
    font-size: 16px;
  }
}

@media screen and (max-width: 480px) {
  /* .decorative-food-header,
  .decorative-food-footer {
    display: none;
  } */

  .nav-buttons {
    flex-direction: column;
    align-items: center;
  }

  .nav-button {
    width: 100%;
    max-width: 250px;
  }
}
</style>
