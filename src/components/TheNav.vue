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

    <!-- Sidebar navigation with enhanced styling -->
    <!-- <transition name="nav-slide">
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
        </div> -->
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

            <!-- <el-menu-item index="1-2" class="submenu-item">
              <router-link to="/shopping-cart" class="menu-link">
                <i class="el-icon-shopping-cart-full"></i>
                <span>Shopping Cart</span>
              </router-link>
            </el-menu-item> -->

            <!-- <el-menu-item index="1-3" class="submenu-item">
              <router-link to="/orders-history" class="menu-link">
                <i class="el-icon-takeaway-box"></i>
                <span>Order History</span>
              </router-link>
            </el-menu-item> -->
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

            <!-- <el-menu-item index="2-3" class="submenu-item">
              <router-link to="/add-item" class="menu-link">
                <i class="el-icon-plus"></i>
                <span>Add Items</span>
              </router-link>
            </el-menu-item> -->
          </el-submenu>

          <!-- Food & Recipes section -->
          <!-- <el-submenu index="3" class="menu-submenu">
            <template #title>
              <i class="el-icon-food"></i>
              <span>Food & Recipes</span>
            </template>

            <el-menu-item index="3-1" class="submenu-item">
              <router-link to="/user-defined-prompts" class="menu-link">
                <i class="el-icon-chat-dot-round"></i>
                <span>Food Prompts</span>
              </router-link>
            </el-menu-item>

            <el-menu-item index="3-2" class="submenu-item">
              <router-link to="/recipe-suggestions" class="menu-link">
                <i class="el-icon-notebook-2"></i>
                <span>Recipe Ideas</span>
              </router-link>
            </el-menu-item>
          </el-submenu> -->

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

            <!-- <el-menu-item index="4-3" class="submenu-item">
              <router-link to="/contact-us" class="menu-link">
                <i class="el-icon-message"></i>
                <span>Contact Us</span>
              </router-link>
            </el-menu-item> -->
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

<style scoped>
/* Nav wrapper */
.nav-wrapper {
  position: relative;
  z-index: 1000;
}

/* Toggle button styling - ENHANCED */
.navbar-toggle {
  position: fixed; /* Fixed position to prevent moving with sidebar */
  top: 13px;
  left: 20px;
  width: 52px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1002; /* Higher z-index than the sidebar */
  color: white;
}
/* When navbar is open, move the toggle button to stay visible outside */
.navbar-toggle.is-active {
  left: 320px; /* Position it to the right of the sidebar */
  background: linear-gradient(135deg, #ff6a88 0%, #ff99ac 100%);
  display: none;
}
.navbar-toggle:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.navbar-toggle:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.5), 0 4px 15px rgba(0, 0, 0, 0.15);
}

/* Added label for better UX */
.toggle-label {
  font-size: 12px;
  margin-top: 5px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
/* Animated hamburger icon - ENHANCED */
/* .toggle-icon {
  position: relative;
  width: 24px;
  height: 2px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
  margin-top: 3px;
} */
.toggle-icon {
  display: none;
}

.toggle-icon:before,
.toggle-icon:after {
  content: "";
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.toggle-icon:before {
  transform: translateY(-8px);
}

.toggle-icon:after {
  transform: translateY(8px);
}

/* .navbar-toggle.is-active {
  background: linear-gradient(135deg, #ff6a88 0%, #ff99ac 100%);
}

.navbar-toggle.is-active .toggle-icon {
  background-color: transparent;
}

.navbar-toggle.is-active .toggle-icon:before {
  transform: rotate(45deg);
}

.navbar-toggle.is-active .toggle-icon:after {
  transform: rotate(-45deg);
} */

/* Sidebar navigation */
.nav-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #d0d0d0 #f5f5f5;
}

.nav-sidebar::-webkit-scrollbar {
  width: 6px;
}

.nav-sidebar::-webkit-scrollbar-track {
  background: #f5f5f5;
}

.nav-sidebar::-webkit-scrollbar-thumb {
  background-color: #d0d0d0;
  border-radius: 3px;
}

/* Navigation header */
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(to right, #ecf5ff, #d7ebff);
}

.nav-logo {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #409eff;
}

.nav-logo i {
  font-size: 24px;
  margin-right: 10px;
}

.close-nav {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: rgba(255, 255, 255, 0.8);
  color: #909399;
  transition: all 0.3s ease;
}

.close-nav:hover {
  background-color: #f56c6c;
  color: white;
  transform: rotate(90deg);
}

/* User section */
.nav-user {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #f0f0f0;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ecf5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.user-avatar i {
  font-size: 20px;
  color: #409eff;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-greeting {
  font-size: 12px;
  color: #909399;
  margin-bottom: 3px;
}

.user-account {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  text-decoration: none;
  transition: color 0.3s ease;
}

.user-account:hover {
  color: #409eff;
  text-decoration: underline;
}

/* Navigation menu */
.nav-menu {
  flex: 1;
  border-right: none;
  background-color: transparent;
}

.menu-item,
.menu-submenu {
  height: auto;
  line-height: 1.5;
  padding: 0;
}

.el-submenu__title {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-size: 15px;
  color: #303133;
  transition: all 0.3s ease;
}

.el-submenu__title i {
  color: #409eff;
  margin-right: 10px;
}

.el-submenu__title:hover {
  background-color: #ecf5ff;
}

.submenu-item {
  padding: 0;
  height: auto;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 0px 26px 6px 23px;
  text-decoration: none;
  color: #606266;
  font-size: 14px;
  transition: all 0.3s ease;
}

.menu-link i {
  margin-right: 10px;
  font-size: 16px;
  color: #909399;
}

.menu-link:hover {
  background-color: #f5f7fa;
  color: #409eff;
}

.menu-link:hover i {
  color: #409eff;
}

/* Active menu item styling */
.el-menu-item.is-active {
  color: #409eff;
  background-color: #ecf5ff;
}

.el-menu-item.is-active .menu-link {
  color: #409eff;
}

.el-menu-item.is-active .menu-link i {
  color: #409eff;
}

/* Navigation footer */
.nav-footer {
  padding: 20px;
  background-color: #f5f7fa;
  border-top: 1px solid #f0f0f0;
}

.nav-social {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #ecf5ff;
  color: #409eff;
  margin: 0 8px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-link:hover {
  background-color: #409eff;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(64, 158, 255, 0.3);
}

.nav-copyright {
  text-align: center;
  font-size: 12px;
  color: #909399;
}

/* Backdrop overlay */
.nav-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 999;
}

/* Transitions */
.nav-slide-enter-active,
.nav-slide-leave-active {
  transition: transform 0.3s ease;
}

.nav-slide-enter,
.nav-slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .navbar-toggle {
    width: 50px;
    height: 50px;
    top: 15px;
    left: 15px;
  }

  .navbar-toggle.is-active {
    left: 290px; /* Adjust for smaller sidebar width on mobile */
  }

  .toggle-icon,
  .toggle-icon:before,
  .toggle-icon:after {
    width: 20px;
  }

  .toggle-label {
    font-size: 10px;
  }

  .nav-sidebar {
    width: 280px;
  }
}

@media screen and (max-width: 480px) {
  navbar-toggle {
    width: 45px;
    height: 45px;
    top: 10px;
    left: 10px;
    border-radius: 10px;
  }

  .navbar-toggle.is-active {
    left: 270px; /* Adjust for even smaller sidebar width on mobile */
  }

  .toggle-icon,
  .toggle-icon:before,
  .toggle-icon:after {
    width: 18px;
  }

  .toggle-icon:before {
    transform: translateY(-6px);
  }

  .toggle-icon:after {
    transform: translateY(6px);
  }

  .toggle-label {
    font-size: 9px;
    margin-top: 4px;
  }

  .nav-sidebar {
    width: 260px;
  }

  .nav-logo {
    font-size: 18px;
  }

  .nav-logo i {
    font-size: 22px;
  }

  .el-submenu__title {
    height: 45px;
    line-height: 45px;
    font-size: 14px;
  }

  .menu-link {
    padding: 10px 20px 10px 45px;
    font-size: 13px;
  }
}

/* Animation for the toggle button */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(79, 172, 254, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(79, 172, 254, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(79, 172, 254, 0);
  }
}

.navbar-toggle:focus {
  animation: pulse 1.5s infinite;
}

/* Food-themed decorations for the navigation */
.nav-sidebar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+");
  opacity: 0.4;
  z-index: -1;
  pointer-events: none;
}

/* Subtle food icon decorations */
.nav-header::after {
  content: "";
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/3143/3143693.png");
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.1;
  z-index: -1;
}

.nav-footer::before {
  content: "";
  position: absolute;
  bottom: 15px;
  left: 15px;
  width: 20px;
  height: 20px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/415/415682.png");
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.1;
  z-index: -1;
}

/* Floating food icon animation in the sidebar */
.nav-sidebar::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/1147/1147801.png");
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.05;
  bottom: 50%;
  right: 20px;
  animation: float-sidebar 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes float-sidebar {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .navbar-toggle {
    background: linear-gradient(135deg, #e63a5996, #1e5fa1);
  }

  .navbar-toggle.is-active {
    background: linear-gradient(135deg, #e63a5996, #1e5fa1);
  }

  .nav-sidebar {
    background: #1a1a1a;
    box-shadow: 5px 0 15px rgba(0, 0, 0, 0.3);
  }

  .nav-sidebar::-webkit-scrollbar-track {
    background: #2d2d2d;
  }

  .nav-sidebar::-webkit-scrollbar-thumb {
    background-color: #4d4d4d;
  }

  .nav-header {
    border-bottom: 1px solid #2d2d2d;
    background: linear-gradient(to right, #283142, #1e2430);
  }

  .nav-logo {
    color: #409eff;
  }

  .close-nav {
    background-color: rgba(45, 45, 45, 0.8);
    color: #c0c4cc;
  }

  .close-nav:hover {
    background-color: #f56c6c;
    color: white;
  }

  .nav-user {
    background-color: #2d2d2d;
    border-bottom: 1px solid #3d3d3d;
  }

  .user-avatar {
    background-color: #283142;
  }

  .user-greeting {
    color: #c0c4cc;
  }

  .user-account {
    color: #e6e6e6;
  }

  .el-submenu__title {
    color: #e6e6e6;
  }

  .el-submenu__title:hover {
    background-color: #283142;
  }

  .menu-link {
    color: #c0c4cc;
  }

  .menu-link:hover {
    background-color: #283142;
    color: #409eff;
  }

  .el-menu-item.is-active {
    background-color: #283142;
  }

  .nav-footer {
    background-color: #2d2d2d;
    border-top: 1px solid #3d3d3d;
  }

  .social-link {
    background-color: #283142;
  }

  .nav-copyright {
    color: #909399;
  }
}

/* Accessibility improvements */
.navbar-toggle:focus {
  outline: 2px solid #409eff;
  outline-offset: 2px;
}

.menu-link:focus {
  outline: 2px solid #409eff;
  outline-offset: -2px;
}

/* High contrast mode support */
@media (forced-colors: active) {
  .navbar-toggle {
    border: 1px solid CanvasText;
  }

  .toggle-icon,
  .toggle-icon:before,
  .toggle-icon:after {
    background-color: CanvasText;
  }

  .nav-sidebar {
    border: 1px solid CanvasText;
  }
}

/* Print styles */
@media print {
  .nav-wrapper {
    display: none;
  }
}
</style>
