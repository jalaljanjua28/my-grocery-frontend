<template>
  <div>
    <el-button class="navbar-button" @click="toggleNavbar">
      <i class="el-icon-caret-right"></i>
    </el-button>
    <el-aside v-if="showNavbar" :default-active="activeIndex" mode="horizontal">
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
              ><router-link to="/receipt-scan" style="text-decoration: none">
                <el-menu-item style="border-bottom: none"
                  ><i class="el-icon-camera" style="font-size: large"></i
                  >Receipt Scan</el-menu-item
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
export default {
  components: {},
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
<style scoped>
.el-button:focus,
.el-button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: blueviolet;
}
</style>
