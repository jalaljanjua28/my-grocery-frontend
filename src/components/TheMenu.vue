<template>
  <div>
    <el-row class="block-col-2">
      <el-col
        :span="12"
        style="display: flex; flex-direction: row; align-items: center"
      >
        <el-popover placement="bottom" width="230" trigger="hover">
          <template #reference>
            <el-button
              >User
              <i class="el-icon-s-custom"></i>
            </el-button>
          </template>
          <div>
            <h3>Signed In User</h3>
            <p style="color: red"><strong>Email:</strong> {{ email }}</p>
            <!-- Add more user details here -->
          </div>
        </el-popover>
        <router-link to="/SignIn" style="text-decoration: none">
          <el-button>Signup<i class="el-icon-user"></i></el-button>
        </router-link>
        <el-dropdown class="el-dropdown-grid">
          <span class="el-dropdown-link">
            <i class="el-icon-s-grid"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/account-page" style="text-decoration: none"
              ><el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-user"></i>Account</el-dropdown-item
              ></router-link
            >
            <router-link to="/shopping-cart" style="text-decoration: none">
              <el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-shopping-cart-full"></i>Shopping
                Cart</el-dropdown-item
              ></router-link
            >
            <router-link to="/orders-history" style="text-decoration: none">
              <el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-takeaway-box"></i>Order
                History</el-dropdown-item
              ></router-link
            >
            <router-link to="/barcode-scan" style="text-decoration: none">
              <el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-camera" style="font-size: large"></i>Barcode
                Scan</el-dropdown-item
              ></router-link
            ><router-link to="/about-us" style="text-decoration: none"
              ><el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-info"></i>About Us</el-dropdown-item
              ></router-link
            >
            <router-link to="/faqs-page" style="text-decoration: none"
              ><el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-question"></i>FAQs</el-dropdown-item
              ></router-link
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { auth, onAuthStateChanged } from "../Firebase.js"; // Adjust the path as necessary

export default {
  components: {},
  data() {
    return {
      email: "",
      currentUser: null,
    };
  },
  async mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.currentUser = user;
          this.email = user.email;
        } else {
          console.log("No user is logged in");
        }
      });
    },
  },
};
</script>
<style scoped>
.el-col-12 {
  width: 100%;
}
.el-button {
  font-size: x-large;
  background-color: transparent;
  border: none;
  padding: 12px 8px;
}
</style>
