<template>
  <div class="nav-wrapper">
    <!-- Toggle button with animated icon - fixed positioning -->
    <el-button
      class="navbar-toggle"
      @click="toggleNavbar"
      :class="{ 'is-active': showNavbar }"
      aria-label="Toggle navigation menu"
    >
      <span class="toggle-icon"></span>
      <span class="toggle-label">Menu</span>
    </el-button>
    <transition name="nav-slide">
      <div
        v-if="showNavbar"
        class="nav-sidebar"
        :class="{ 'is-visible': showNavbar }"
      >
        <div class="nav-header">
          <div class="nav-logo">
            <i class="el-icon-shopping-bag-1"></i>
            <span>My Grocery</span>
          </div>
          <el-button
            class="close-nav"
            @click="toggleNavbar"
            aria-label="Close navigation"
          >
            <i class="el-icon-close"></i>
          </el-button>
        </div>

        <div class="nav-user">
          <div class="user-avatar">
            <i class="el-icon-user"></i>
          </div>
          <div class="user-info">
            <span class="user-greeting">Welcome</span>
            <router-link to="/account-page" class="user-account"
              >My Account</router-link
            >
          </div>
        </div>

        <el-menu
          class="nav-menu"
          :default-active="activeIndex"
          @select="handleSelect"
        >
          <!-- Home section -->
          <el-menu-item index="0" class="menu-item">
            <router-link to="/" class="menu-link">
              <i class="el-icon-house"></i>
              <span>Home</span>
            </router-link>
          </el-menu-item>

          <!-- Account & Shopping section -->
          <el-submenu index="1" class="menu-submenu">
            <template #title>
              <i class="el-icon-user"></i>
              <span>Account & Shopping</span>
            </template>

            <el-menu-item index="1-1" class="submenu-item">
              <router-link to="/account-page" class="menu-link">
                <i class="el-icon-user"></i>
                <span>My Account</span>
              </router-link>
            </el-menu-item>
          </el-submenu>

          <!-- Inventory section -->
          <el-submenu index="2" class="menu-submenu">
            <template #title>
              <i class="el-icon-box"></i>
              <span>Inventory</span>
            </template>

            <el-menu-item index="2-1" class="submenu-item">
              <router-link to="/items-inventory" class="menu-link">
                <i class="el-icon-goods"></i>
                <span>My Inventory</span>
              </router-link>
            </el-menu-item>

            <el-menu-item index="2-2" class="submenu-item">
              <router-link to="/receipt-scan" class="menu-link">
                <i class="el-icon-camera"></i>
                <span>Receipt Scanner</span>
              </router-link>
            </el-menu-item>
          </el-submenu>

          <!-- Information section -->
          <el-submenu index="4" class="menu-submenu">
            <template #title>
              <i class="el-icon-info"></i>
              <span>Information</span>
            </template>

            <el-menu-item index="4-1" class="submenu-item">
              <router-link to="/about-us" class="menu-link">
                <i class="el-icon-office-building"></i>
                <span>About Us</span>
              </router-link>
            </el-menu-item>

            <el-menu-item index="4-2" class="submenu-item">
              <router-link to="/faqs-page" class="menu-link">
                <i class="el-icon-question"></i>
                <span>FAQs</span>
              </router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>

        <div class="nav-footer">
          <div class="nav-social">
            <a href="#" class="social-link"
              ><i class="el-icon-s-platform"></i
            ></a>
            <a href="#" class="social-link"
              ><i class="el-icon-s-promotion"></i
            ></a>
            <a href="#" class="social-link"
              ><i class="el-icon-s-cooperation"></i
            ></a>
          </div>
          <div class="nav-copyright">© 2023 My Grocery Home</div>
        </div>
      </div>
    </transition>

    <!-- Backdrop overlay when nav is open -->
    <transition name="fade">
      <div v-if="showNavbar" class="nav-backdrop" @click="toggleNavbar"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNavbar: false,
      activeIndex: "0",
    };
  },
  methods: {
    toggleNavbar() {
      this.showNavbar = !this.showNavbar;

      // Prevent body scrolling when nav is open
      if (this.showNavbar) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      console.log("showNavbar:", this.showNavbar);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      // Close navbar on mobile after selection
      if (window.innerWidth < 768) {
        this.showNavbar = false;
        document.body.style.overflow = "";
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  // Close navbar when route changes
  watch: {
    $route() {
      if (window.innerWidth < 768) {
        this.showNavbar = false;
        document.body.style.overflow = "";
      }
    },
  },
  // Clean up body overflow style when component is destroyed
  beforeDestroy() {
    document.body.style.overflow = "";
  },
};
</script>

<style scoped></style>
