<template>
  <div class="navbar">
    <el-button
      style="background: darkcyan"
      class="navbar-button"
      @click="toggleNavbar"
    >
      <i style="color: white" class="el-icon-caret-right"></i>
    </el-button>
    <header-logo></header-logo>
    <el-aside
      width="200px"
      style="background: rgba(243, 225, 191, 0.86); height: 100%"
      class="aside"
      v-show="showNavbar"
      :default-active="activeIndex"
      mode="horizontal"
    >
      <el-menu>
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>Navigator One</template
          >
          <el-menu-item-group>
            <el-menu-item index="1-1"
              ><router-link to="/account-page" style="text-decoration: none"
                ><el-menu-item style="border-bottom: none"
                  ><i class="el-icon-user"></i>Account</el-menu-item
                ></router-link
              ></el-menu-item
            >
            <el-menu-item index="1-2"
              ><router-link to="/shopping-cart" style="text-decoration: none">
                <el-menu-item style="border-bottom: none"
                  ><i class="el-icon-shopping-cart-full"></i>Shopping
                  Cart</el-menu-item
                ></router-link
              ></el-menu-item
            >
            <el-menu-item index="1-3">
              <router-link to="/orders-history" style="text-decoration: none">
                <el-menu-item style="border-bottom: none"
                  ><i class="el-icon-takeaway-box"></i>Order
                  History</el-menu-item
                ></router-link
              >
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-menu"></i>Navigator Two</template
          >
          <el-menu-item-group>
            <el-menu-item index="2-1"
              ><router-link to="/barcode-scan" style="text-decoration: none">
                <el-menu-item style="border-bottom: none"
                  ><i class="el-icon-camera" style="font-size: large"></i
                  >Barcode Scan</el-menu-item
                ></router-link
              ></el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-setting"></i>Navigator Three</template
          >
          <el-menu-item-group>
            <el-menu-item index="3-1"
              ><router-link to="/about-us" style="text-decoration: none"
                ><el-menu-item style="border-bottom: none"
                  ><i class="el-icon-info"></i>About Us</el-menu-item
                ></router-link
              ></el-menu-item
            >
            <el-menu-item index="3-2"
              ><router-link to="/faqs-page" style="text-decoration: none"
                ><el-menu-item style="border-bottom: none"
                  ><i class="el-icon-question"></i>FAQs</el-menu-item
                ></router-link
              ></el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import HeaderLogo from "./HeaderLogo.vue";

export default {
  components: { HeaderLogo },
  data() {
    return {
      showNavbar: false,
      activeIndex: "1",
    };
  },
  methods: {
    toggleNavbar() {
      this.showNavbar = !this.showNavbar; // Toggle the state
      console.log("showNavbar:", this.showNavbar);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped></style>
