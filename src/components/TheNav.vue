<template>
  <el-aside
    width="200px"
    style="background: #f3e1bfdb; width: 200px; height: 157.5vh"
    class="aside"
  >
    <header-logo></header-logo>
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
                ><i class="el-icon-takeaway-box"></i>Order History</el-menu-item
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
                ><i class="el-icon-camera" style="font-size: large"></i>Barcode
                Scan</el-menu-item
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
</template>

<script>
import HeaderLogo from "./HeaderLogo.vue";
export default {
  components: { HeaderLogo },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
