<template>
  <div class="inventory-page-container">
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Items Inventory" class="custom-page-header">
        <template slot="content">
          <div class="page-title">
            <i class="el-icon-goods"></i>
            <span>Items Inventory</span>
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
        <router-link to="/health-page" class="router_link">
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
      <!-- Decorative food-themed header -->
      <div class="decorative-food-header">
        <div class="food-icon apple"></div>
        <div class="food-icon banana"></div>
        <div class="food-icon carrot"></div>
        <div class="food-icon broccoli"></div>
        <div class="food-icon orange"></div>
      </div>
      <el-card class="inventory-card">
        <div class="card-decoration left-decoration">
          <div class="food-icon tomato"></div>
          <div class="food-icon grapes"></div>
          <div class="food-icon avocado"></div>
        </div>

        <!-- Enhanced Search Container -->
        <div class="search-container">
          <div class="search-header">
            <i class="el-icon-search"></i>
            <h3>Find Items</h3>
          </div>
          <search-inventory
            :ExpiredFood="Food_expired"
            :ExpiredNonFood="NonFood_expired"
            :NonExpiredFood="Food_nonexpired"
            :NonExpiredNonFood="NonFood_nonexpired"
            :itemsFood="Food"
            :itemsNonFood="NonFood"
            class="enhanced-search"
          />
        </div>

        <!-- Enhanced Tabs -->
        <el-tabs
          :tab-position="tabPosition"
          style="height: auto"
          v-model="outerActiveTab"
          @tab-click="handleOuterTabClick"
          class="custom-tabs"
        >
          <!-- Non - Expired Tab -->
          <el-tab-pane name="a" label="Non Expired">
            <span
              slot="label"
              class="el-tabs__label"
              style="font-size: x-large"
            >
              <div class="tab-label-container">
                <i class="el-icon-success"></i>
                <span>Non Expired</span>
                <div class="tab-indicator non-expired-indicator"></div>
              </div>
            </span>
            <el-tabs
              v-model="innerActiveTab"
              @tab-click="handleInnerTabClick"
              class="inner-tabs"
            >
              <el-tab-pane name="1" label="Food">
                <span
                  slot="label"
                  class="el-tabs__sublabel"
                  style="font-size: large"
                >
                  <div class="tab-label-container">
                    <i class="el-icon-food"></i>
                    <span>Food</span>
                    <div class="tab-indicator food-indicator"></div>
                  </div>
                </span>
                <div class="tab-content-container">
                  <non-expired-list
                    :items="Food_nonexpired"
                    @item-deleted="handleItemDeleted()"
                  ></non-expired-list>
                </div>
              </el-tab-pane>
              <el-tab-pane name="2" label="Not Food">
                <span
                  slot="label"
                  class="el-tabs__sublabel"
                  style="font-size: large"
                >
                  <div class="tab-label-container">
                    <i class="el-icon-bicycle"></i>
                    <span>Non Food</span>
                    <div class="tab-indicator non-food-indicator"></div>
                  </div>
                </span>
                <div class="tab-content-container">
                  <non-expired-list
                    :items="NonFood_nonexpired"
                    @item-deleted="handleItemDeleted()"
                  ></non-expired-list>
                </div>
              </el-tab-pane>
            </el-tabs>
            <delete-all-master-non-expired></delete-all-master-non-expired>
          </el-tab-pane>

          <!-- Expired Tab -->
          <el-tab-pane name="b" label="Expired">
            <span
              slot="label"
              class="el-tabs__label"
              style="font-size: x-large"
            >
              <div class="tab-label-container">
                <i class="el-icon-error"></i>
                <span>Expired</span>
                <div class="tab-indicator expired-indicator"></div>
              </div>
            </span>
            <el-tabs
              v-model="innerActiveTab"
              @tab-click="handleInnerTabClick"
              class="inner-tabs"
            >
              <el-tab-pane name="3" label="Food">
                <span
                  slot="label"
                  class="el-tabs__sublabel"
                  style="font-size: large"
                >
                  <div class="tab-label-container">
                    <i class="el-icon-food"></i>
                    <span>Food</span>
                    <div class="tab-indicator food-indicator"></div>
                  </div>
                </span>
                <div class="tab-content-container">
                  <expired-list
                    :items="Food_expired"
                    @item-deleted="handleItemDeleted"
                  ></expired-list>
                </div>
              </el-tab-pane>
              <el-tab-pane name="4" label="Not Food">
                <span
                  slot="label"
                  class="el-tabs__sublabel"
                  style="font-size: large"
                >
                  <div class="tab-label-container">
                    <i class="el-icon-bicycle"></i>
                    <span>Non Food</span>
                    <div class="tab-indicator non-food-indicator"></div>
                  </div>
                </span>
                <div class="tab-content-container">
                  <expired-list
                    :items="NonFood_expired"
                    @item-deleted="handleItemDeleted()"
                  ></expired-list>
                </div>
              </el-tab-pane>
            </el-tabs>
            <delete-all-master-expired></delete-all-master-expired>
          </el-tab-pane>

          <!-- Shopping List Tab -->
          <el-tab-pane name="c" label="Shopping">
            <span
              slot="label"
              class="el-tabs__label"
              style="font-size: x-large"
            >
              <div class="tab-label-container">
                <i class="el-icon-s-claim"></i>
                <span>Shopping List</span>
                <div class="tab-indicator shopping-indicator"></div>
              </div>
            </span>
            <el-tabs
              v-model="innerActiveTab"
              @tab-click="handleInnerTabClick"
              class="inner-tabs"
            >
              <el-tab-pane name="5" label="Food">
                <span
                  slot="label"
                  class="el-tabs__sublabel"
                  style="font-size: large"
                >
                  <div class="tab-label-container">
                    <i class="el-icon-food"></i>
                    <span>Food</span>
                    <div class="tab-indicator food-indicator"></div>
                  </div>
                </span>
                <div class="tab-content-container">
                  <shopping-list
                    :items="Food"
                    @item-deleted="handleItemDeleted()"
                  ></shopping-list>
                </div>
              </el-tab-pane>
              <el-tab-pane name="6" label="Not Food">
                <span
                  slot="label"
                  class="el-tabs__sublabel"
                  style="font-size: large"
                >
                  <div class="tab-label-container">
                    <i class="el-icon-bicycle"></i>
                    <span>Non Food</span>
                    <div class="tab-indicator non-food-indicator"></div>
                  </div>
                </span>
                <div class="tab-content-container">
                  <shopping-list
                    :items="NonFood"
                    @item-deleted="handleItemDeleted()"
                  ></shopping-list>
                </div>
              </el-tab-pane>
            </el-tabs>
            <delete-all-shopping></delete-all-shopping>
          </el-tab-pane>
        </el-tabs>

        <div class="add-item-container">
          <el-button
            @click="openDialog"
            class="add-item-button"
            type="success"
            plain
          >
            <i class="el-icon-plus"></i> Add Manually to Shopping
          </el-button>
          <el-dialog
            :visible.sync="dialogVisible"
            width="90%"
            class="custom-dialog"
          >
            <div class="dialog-header-decoration">
              <div class="food-icon strawberry"></div>
              <h3>Add New Item</h3>
              <div class="food-icon pineapple"></div>
            </div>
            <add-items @item-added="closeDialog" />
          </el-dialog>
        </div>

        <div class="card-decoration right-decoration">
          <div class="food-icon watermelon"></div>
          <div class="food-icon peach"></div>
          <div class="food-icon potato"></div>
        </div>
      </el-card>

      <!-- Enhanced Frequency List Card -->
      <el-card class="frequency-card">
        <div class="frequency-header">
          <i class="el-icon-data-analysis"></i>
          <h3>Item Frequency Analysis</h3>
        </div>
        <div class="frequency-description">
          <p>
            Track how often you purchase different items to optimize your
            shopping habits.
          </p>
        </div>
        <frequency-list></frequency-list>
      </el-card>
    </el-main>

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
import SearchInventory from "../components/SearchInventory.vue";
import ExpiredList from "../components/ExpiredList.vue";
import NonExpiredList from "../components/NonExpiredList.vue";
import AddItems from "../components/AddCustomItem.vue";
import DeleteAllMasterNonExpired from "../components/DeleteAllMasterNonExpired.vue";
import DeleteAllShopping from "../components/DeleteAllShopping.vue";
import DeleteAllMasterExpired from "../components/DeleteAllMasterExpired.vue";
import ShoppingList from "../components/ShoppingList.vue";
import FrequencyList from "../components/FrequencyList.vue";
import {
  fetchMasterExpiredData,
  fetchShoppingListData,
  fetchMasterNonexpiredData,
} from "@/plugins/Dataservice.js";

export default {
  components: {
    ShoppingList,
    SearchInventory,
    ExpiredList,
    NonExpiredList,
    AddItems,
    DeleteAllMasterNonExpired,
    DeleteAllShopping,
    DeleteAllMasterExpired,
    FrequencyList,
  },
  data() {
    return {
      outerActiveTab: null,
      innerActiveTab: null,
      Food: [],
      NonFood: [],
      Food_expired: [],
      NonFood_expired: [],
      Food_nonexpired: [],
      NonFood_nonexpired: [],
      items: [],
      tabPosition: "top",
      dialogVisible: false,
      dialogData: {}, // Data to pass to the Add Item component
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
  created() {
    // Retrieve the active tab from local storage on page load
    const storedOuterTab = localStorage.getItem("activeOuterTab");
    const storedInnerTab = localStorage.getItem("activeInnerTab");
    if (storedOuterTab && storedInnerTab) {
      this.outerActiveTab = storedOuterTab;
      this.innerActiveTab = storedInnerTab;
    }
    this.outerActiveTab = "a"; // "a" corresponds to the "Non Expired" tab
    this.innerActiveTab = "1"; // "1" corresponds to the "Food" sub-tab

    // Store these values in localStorage
    localStorage.setItem("activeOuterTab", this.outerActiveTab);
    localStorage.setItem("activeInnerTab", this.innerActiveTab);
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    handleItemDeleted(itemToDelete) {
      this.items = this.items.filter((item) => item !== itemToDelete);
      console.log("Deleted Item:", itemToDelete);
    },
    handleItemAdded(newItem) {
      this.items.push(newItem);
      console.log("Added Item:", newItem);
    },
    // ... (continuing from where we left off)
    handleInnerTabClick(tab) {
      // Update the local storage on inner tab change
      localStorage.setItem("activeInnerTab", tab.name);
      console.log("Inner Tab: " + this.innerActiveTab);
    },
    handleOuterTabClick(tab) {
      // Update the local storage on outer tab change
      localStorage.setItem("activeOuterTab", tab.name);
      console.log("Outer Tab: " + this.outerActiveTab);
    },
  },
};
</script>

<style scoped>
/* Custom styles specific to this component that don't overlap with global styles */
.inventory-page-container {
  position: relative;
  padding: 20px 0;
  min-height: 100vh;
}

/* Background pattern */
.inventory-page-container::before {
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

/* Card decorations */
/* Inventory card */
.inventory-card {
  position: relative;
  margin-bottom: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border: none;
  overflow: visible;
  padding: 20px;
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
  left: -15px;
  top: 50%;
  transform: translateY(-50%);
}

.right-decoration {
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
}

/* Search container */
.search-container {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f0f9eb;
  border-radius: 10px;
  border-left: 4px solid #67c23a;
}

.search-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.search-header i {
  font-size: 24px;
  color: #67c23a;
  margin-right: 10px;
}

.search-header h3 {
  margin: 0;
  color: #67c23a;
}

.enhanced-search {
  width: 100%;
}

/* Custom tabs styling */
.tab-label-container {
  display: flex;
  align-items: center;
  position: relative;
  padding-bottom: 5px;
}

.tab-indicator {
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.non-expired-indicator {
  background-color: #67c23a;
}

.expired-indicator {
  background-color: #f56c6c;
}

.shopping-indicator {
  background-color: #409eff;
}

.food-indicator {
  background-color: #e6a23c;
}

.non-food-indicator {
  background-color: #909399;
}

.inner-tabs {
  margin-top: 20px;
  margin-bottom: 30px;
}

.tab-content-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

/* Add item button - custom styling */
.add-item-button {
  font-size: 16px;
  padding: 6px 24px;
  border-radius: 8px;
  border: 2px solid #67c23a;
  color: #67c23a;
  background-color: #f0f9eb;
  transition: all 0.3s ease;
}

.add-item-button:hover {
  background-color: #67c23a;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(103, 194, 58, 0.3);
}

/* Dialog header decoration */
.dialog-header-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.dialog-header-decoration h3 {
  margin: 0 15px;
  color: #67c23a;
}

/* Frequency card */
.frequency-card {
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border: none;
  padding: 20px;
  margin-bottom: 30px;
}

.frequency-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
}

.frequency-header i {
  font-size: 24px;
  color: #409eff;
  margin-right: 10px;
}

.frequency-header h3 {
  margin: 0;
  color: #409eff;
}

.frequency-description {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ecf5ff;
  border-radius: 6px;
}

.frequency-description p {
  margin: 0;
  color: #409eff;
  font-size: 14px;
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

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .card-decoration {
    display: none;
  }

  .decorative-food-header,
  .decorative-food-footer {
    max-width: 100%;
  }

  .food-icon {
    width: 25px;
    height: 25px;
  }

  .nav-button {
    font-size: medium;
    padding: 10px 15px;
  }

  .search-container {
    padding: 15px;
  }

  .tab-content-container {
    padding: 15px;
  }
}

@media screen and (max-width: 480px) {
  .decorative-food-header,
  .decorative-food-footer {
    display: none;
  }

  .nav-buttons {
    flex-direction: column;
    align-items: center;
  }

  .nav-button {
    width: 100%;
    max-width: 250px;
  }

  .page-title {
    font-size: 14px;
  }

  .page-title i {
    font-size: 24px;
  }

  .search-header i,
  .frequency-header i {
    font-size: 20px;
  }

  .search-header h3,
  .frequency-header h3 {
    font-size: 16px;
  }
}
</style>
