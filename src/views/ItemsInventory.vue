<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Items Inventory"> </el-page-header>
    </router-link>
    <el-main class="main-content">
      <div
        class="nav-buttons"
        style="
          display: flex;
          align-items: center;
          background-color: darkcyan;
          border-radius: 10px;
          padding: 0px;
          border: 2px solid black;
        "
      >
        <router-link to="/recipes-page" class="router_link">
          <el-button
            style="
              font-size: x-large;
              background-color: darkcyan;
              border: none;
              padding: 12px;
              color: white;
            "
            ><i class="el-icon-chicken"> Recipes</i>
          </el-button>
        </router-link>
        <router-link to="/health-page" class="router_link">
          <el-button
            style="
              font-size: x-large;
              background-color: darkcyan;
              border: none;
              padding: 12px;
              color: white;
            "
            ><i class="el-icon-no-smoking"> Health</i>
          </el-button>
        </router-link>
        <router-link to="user-defined-prompt" class="router_link">
          <el-button
            style="
              font-size: x-large;
              background-color: darkcyan;
              border: none;
              padding: 12px;
              color: white;
            "
            ><i class="el-icon-s-order"> User Defined Prompt</i>
          </el-button>
        </router-link>
      </div>
      <el-card>
        <div class="search-container">
          <search-inventory
            :ExpiredFood="Food_expired"
            :ExpiredNonFood="NonFood_expired"
            :NonExpiredFood="Food_nonexpired"
            :NonExpiredNonFood="NonFood_nonexpired"
            :itemsFood="Food"
            :itemsNonFood="NonFood"
          />
        </div>
        <el-tabs
          :tab-position="tabPosition"
          style="height: auto"
          v-model="outerActiveTab"
          @tab-click="handleOuterTabClick"
        >
          <!-- Non - Expired Tab -->
          <el-tab-pane name="a" label="Non Expired"
            ><span
              slot="label"
              class="el-tabs__label"
              style="font-size: x-large"
              ><i class="el-icon-success"></i> Non Expired</span
            >
            <el-tabs v-model="innerActiveTab" @tab-click="handleInnerTabClick">
              <el-tab-pane name="1" label="Food"
                ><span
                  slot="label"
                  class="el-tabs__sublabel"
                  style="font-size: large"
                  ><i class="el-icon-food"></i> Food</span
                >
                <div>
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
                  ><i class="el-icon-bicycle"></i> Non Food</span
                >
                <div>
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
          <el-tab-pane name="b" label="Expired"
            ><span
              slot="label"
              class="el-tabs__label"
              style="font-size: x-large"
              ><i class="el-icon-error"></i> Expired</span
            >
            <el-tabs v-model="innerActiveTab" @tab-click="handleInnerTabClick">
              <el-tab-pane name="3" label="Food"
                ><span
                  slot="label"
                  class="el-tabs__sublabel"
                  style="font-size: large"
                  ><i class="el-icon-food"></i> Food</span
                >
                <div>
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
                  ><i class="el-icon-bicycle"></i> Non Food</span
                >
                <div>
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
          <el-tab-pane name="c" label="Shopping"
            ><span
              slot="label"
              class="el-tabs__label"
              style="font-size: x-large"
              ><i class="el-icon-s-claim"></i> Shopping List</span
            >
            <el-tabs v-model="innerActiveTab" @tab-click="handleInnerTabClick">
              <el-tab-pane name="5" label="Food"
                ><span
                  slot="label"
                  class="el-tabs__sublabel"
                  style="font-size: large"
                  ><i class="el-icon-food"></i> Food</span
                >
                <div>
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
                  ><i class="el-icon-bicycle"></i> Non Food</span
                >
                <div>
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
        <div>
          <el-button
            @click="openDialog"
            style="
              font-size: x-large;
              background-color: darkcyan;
              border: none;
              padding: 12px;
              color: chartreuse;
              margin-top: 10px;
            "
            ><i class="el-icon-plus"> Add items to shopping manually</i>
          </el-button>
          <el-dialog :visible.sync="dialogVisible" title="Add Item" width="90%">
            <add-items @item-added="closeDialog" />
          </el-dialog>
        </div>
      </el-card>
      <el-card>
        <frequency-list></frequency-list>
      </el-card>
    </el-main>
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
.el-button--small {
  padding: 5px 19px;
  font-size: 12px;
  border-radius: 0px;
  margin-top: 10px;
}
.search-container {
  margin-bottom: 20px;
}
</style>
