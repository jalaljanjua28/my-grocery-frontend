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
        <div class="card-decoration left-inventorylist-decoration">
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
                <span slot="label" class="el-tabs__sublabel">
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
                <span slot="label" class="el-tabs__sublabel">
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
                <span slot="label" class="el-tabs__sublabel">
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
                <span slot="label" class="el-tabs__sublabel">
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
                <span slot="label" class="el-tabs__sublabel">
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
                <span slot="label" class="el-tabs__sublabel">
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
          <el-dialog :visible.sync="dialogVisible" class="custom-dialog">
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

<style scoped></style>
