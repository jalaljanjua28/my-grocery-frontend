<template>
  <div class="nav-sidebar-root">
    <!-- Backdrop -->
    <transition name="fade">
      <div
        v-if="navState.showNavbar"
        class="nav-backdrop"
        @click="closeNavbar"
      ></div>
    </transition>

    <!-- Sidebar -->
    <transition name="nav-slide">
      <div v-if="navState.showNavbar" class="nav-sidebar">
        <!-- Sidebar header -->
        <div class="nav-header">
          <div class="nav-logo">
            <span class="nav-logo-icon">🛒</span>
            <span class="nav-logo-text">My Grocery</span>
          </div>
          <button
            class="close-btn"
            @click="toggleNavbar"
            aria-label="Close navigation"
          >
            <i class="el-icon-close"></i>
          </button>
        </div>

        <!-- User welcome strip -->
        <div class="nav-user">
          <div class="user-avatar"><i class="el-icon-user-solid"></i></div>
          <div class="user-info">
            <span class="user-greeting">Welcome back 👋</span>
            <router-link
              to="/account-page"
              class="user-account-link"
              @click.native="closeNavbar"
              >My Account</router-link
            >
          </div>
        </div>

        <!-- Menu items -->
        <nav class="nav-links">
          <router-link to="/" class="nav-item" @click.native="closeNavbar">
            <span class="nav-item-icon">🏠</span>
            <span>Home</span>
          </router-link>

          <div class="nav-group">
            <div class="nav-group-label">
              <span class="nav-item-icon">👤</span>
              <span>Account & Shopping</span>
            </div>
            <div class="nav-group-children">
              <router-link
                to="/account-page"
                class="nav-child"
                @click.native="closeNavbar"
                ><span class="child-icon">⚙️</span> My Account</router-link
              >
              <router-link
                to="/shopping-cart"
                class="nav-child"
                @click.native="closeNavbar"
                ><span class="child-icon">🛒</span> Shopping Cart</router-link
              >
              <router-link
                to="/orders-history"
                class="nav-child"
                @click.native="closeNavbar"
                ><span class="child-icon">📋</span> Orders History</router-link
              >
            </div>
          </div>

          <div class="nav-group">
            <div class="nav-group-label">
              <span class="nav-item-icon">📦</span>
              <span>Inventory</span>
            </div>
            <div class="nav-group-children">
              <router-link
                to="/items-inventory"
                class="nav-child"
                @click.native="closeNavbar"
                ><span class="child-icon">🥫</span> My Inventory</router-link
              >
              <router-link
                to="/receipt-scan"
                class="nav-child"
                @click.native="closeNavbar"
                ><span class="child-icon">📸</span> Receipt Scanner</router-link
              >
            </div>
          </div>

          <div class="nav-group">
            <div class="nav-group-label">
              <span class="nav-item-icon">🤖</span>
              <span>AI & Insights</span>
            </div>
            <div class="nav-group-children">
              <router-link
                to="/recipes-page"
                class="nav-child"
                @click.native="closeNavbar"
                ><span class="child-icon">🍳</span> Recipes</router-link
              >
              <router-link
                to="/health-page"
                class="nav-child"
                @click.native="closeNavbar"
                ><span class="child-icon">💚</span> Health</router-link
              >
              <router-link
                to="/user-defined-prompt"
                class="nav-child"
                @click.native="closeNavbar"
                ><span class="child-icon">💬</span> Custom Prompts</router-link
              >
            </div>
          </div>

          <div class="nav-group">
            <div class="nav-group-label">
              <span class="nav-item-icon">ℹ️</span>
              <span>Information</span>
            </div>
            <div class="nav-group-children">
              <router-link
                to="/about-us"
                class="nav-child"
                @click.native="closeNavbar"
                ><span class="child-icon">🏢</span> About Us</router-link
              >
              <router-link
                to="/faqs-page"
                class="nav-child"
                @click.native="closeNavbar"
                ><span class="child-icon">❓</span> FAQs</router-link
              >
            </div>
          </div>
        </nav>

        <div class="nav-footer">
          <div class="nav-footer-icons">
            <span>🍎</span><span>🥦</span><span>🍊</span><span>🥕</span>
          </div>
          <div class="nav-copyright">© {{ year }} My Grocery Home</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { navState, toggleNavbar, closeNavbar } from "@/store/navState.js";

export default {
  data() {
    return { navState, year: new Date().getFullYear() };
  },
  methods: {
    toggleNavbar,
    closeNavbar,
  },
  watch: {
    $route() {
      closeNavbar();
    },
  },
  beforeDestroy() {
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
/* ── Backdrop ── */
.nav-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.38);
  z-index: 2998;
  backdrop-filter: blur(2px);
}

/* ── Sidebar ── */
.nav-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 290px;
  height: 100vh;
  background: linear-gradient(
    170deg,
    #fff 0%,
    rgba(243, 251, 240, 0.98) 50%,
    rgba(237, 246, 255, 0.97) 100%
  );
  box-shadow: -4px 0 28px rgba(0, 0, 0, 0.14);
  z-index: 2999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(103, 194, 58, 0.18);
  background: linear-gradient(
    135deg,
    rgba(103, 194, 58, 0.07),
    rgba(64, 158, 255, 0.05)
  );
  flex-shrink: 0;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.nav-logo-icon {
  font-size: 22px;
}
.nav-logo-text {
  font-size: 16px;
  font-weight: 800;
  background: linear-gradient(135deg, #2e7d32, #1565c0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.close-btn {
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #909399;
  transition: background 0.18s, color 0.18s;
}
.close-btn:hover {
  background: rgba(230, 57, 70, 0.08);
  color: #e63946;
  border-color: rgba(230, 57, 70, 0.2);
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
}
.user-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(103, 194, 58, 0.15),
    rgba(64, 158, 255, 0.12)
  );
  border: 1.5px solid rgba(103, 194, 58, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #43a047;
  flex-shrink: 0;
}
.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.user-greeting {
  font-size: 12px;
  color: #909399;
}
.user-account-link {
  font-size: 13px;
  font-weight: 600;
  color: #409eff;
  text-decoration: none;
}
.user-account-link:hover {
  text-decoration: underline;
}

.nav-links {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 20px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  transition: background 0.15s, color 0.15s;
}
.nav-item:hover,
.nav-item.router-link-active {
  background: rgba(103, 194, 58, 0.08);
  color: #2e7d32;
}

.nav-group-label {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 20px 7px;
  font-size: 13px;
  font-weight: 700;
  color: #606266;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  cursor: default;
}
.nav-group-children {
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  margin-bottom: 2px;
}
.nav-child {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px 9px 42px;
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 500;
  color: #606266;
  transition: background 0.15s, color 0.15s, padding-left 0.15s;
}
.nav-child:hover,
.nav-child.router-link-active {
  background: rgba(64, 158, 255, 0.07);
  color: #409eff;
  padding-left: 48px;
}
.nav-item-icon {
  font-size: 17px;
  flex-shrink: 0;
}
.child-icon {
  font-size: 15px;
  flex-shrink: 0;
}

.nav-footer {
  padding: 14px 18px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  background: rgba(103, 194, 58, 0.04);
}
.nav-footer-icons {
  display: flex;
  gap: 10px;
  font-size: 16px;
  opacity: 0.55;
}
.nav-copyright {
  font-size: 11px;
  color: #c0c4cc;
}

/* Transitions */
.nav-slide-enter-active,
.nav-slide-leave-active {
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.nav-slide-enter {
  transform: translateX(100%);
}
.nav-slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.24s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
