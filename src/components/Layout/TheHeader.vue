<template>
  <div>
    <el-header class="header">
      <header-logo></header-logo>
      <search-inventory
        :ExpiredFood="Food_expired"
        :ExpiredNonFood="NonFood_expired"
        :NonExpiredFood="Food_nonexpired"
        :NonExpiredNonFood="NonFood_nonexpired"
        :itemsFood="Food"
        :itemsNonFood="NonFood"
      ></search-inventory>
      <the-menu></the-menu>
      <items-inventory class="inventory" ref="ItemsInventory" />
    </el-header>
  </div>
</template>

<script>
import TheMenu from "../UI/TheMenu.vue";
import HeaderLogo from "../UI/HeaderLogo.vue";
import SearchInventory from "../Data-resources/Search-component/SearchInventory.vue";
import ItemsInventory from "@/views/ItemsInventory.vue";

export default {
  components: {
    TheMenu,
    HeaderLogo,
    SearchInventory,
    ItemsInventory,
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
  mounted() {
    // Access the ItemsInventory component instance
    const itemsInventory = this.$refs.ItemsInventory;
    // Execute all three methods concurrently and wait for their completion
    Promise.all([
      itemsInventory.master_nonexpired(),
      itemsInventory.shopping_list(),
      itemsInventory.master_expired(),
    ]).catch((error) => {
      console.error("Error fetching items:", error);
    });
  },

  methods: {},
};
</script>

<style scoped>
.inventory {
  display: none;
}
</style>
