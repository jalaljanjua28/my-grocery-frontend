import Vue from "vue";
import VueRouter from "vue-router";
import store from "./../store/index.js";
import HomeView from "../views/HomeView.vue";
import ShoppingCart from "../views/ShoppingCart.vue";
import OffersList from "../views/OffersList";
import AboutUs from "../views/AboutUs";
import ItemsInventory from "../views/ItemsInventory";
import AccountPage from "../views/AccountPage";
import OrdersHistory from "../views/OrdersHistory";
import RecipePage from "../views/RecipePage";
import FAQPage from "../views/FAQs";
import ReceiptScan from "../views/ReceiptScan";
import Search from "../components/SearchInventory.vue";
import HealthPage from "../views/HealthPage.vue";
import UserDefinedPrompt from "../views/UserDefinedPrompts.vue";
import FirebaseAuth from "../views/LoginSignup.vue";
import DeleteAll from "../components/DeleteAll.vue";
import { auth } from "../Firebase.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/delete-all",
    name: "deleteAll",
    component: DeleteAll,
  },
  {
    path: "/SignUp",
    name: "Firebase",
    component: FirebaseAuth,
  },
  {
    path: "/shopping-cart",
    name: "shopping",
    component: ShoppingCart,
  },
  {
    path: "/offer-list",
    name: "offer",
    component: OffersList,
  },

  {
    path: "/about-us",
    name: "about",
    component: AboutUs,
  },
  {
    path: "/items-inventory",
    name: "inventory",
    component: ItemsInventory,
  },
  {
    path: "/account-page",
    name: "login",
    component: AccountPage,
  },
  {
    path: "/orders-history",
    name: "order",
    component: OrdersHistory,
  },
  {
    path: "/recipes-page",
    name: "recipe",
    component: RecipePage,
  },
  {
    path: "/faqs-page",
    name: "faqs",
    component: FAQPage,
  },
  {
    path: "/receipt-scan",
    name: "receipt",
    component: ReceiptScan,
  },
  {
    path: "/search-inventory",
    name: "search",
    component: Search,
  },
  {
    path: "/health-page",
    name: "health",
    component: HealthPage,
  },
  {
    path: "/user-defined-prompt",
    name: "prompt",
    component: UserDefinedPrompt,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit("setLoading", true);
  next();
});
// Add route guard
router.beforeEach(async (to, from, next) => {
  // Wait for auth to initialize
  await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      unsubscribe();
      resolve();
    });
  });

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = !!auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next("/SignUp");
  } else {
    next();
  }
});

router.afterEach(() => {
  setTimeout(() => {
    store.commit("setLoading", false);
  }, 1000);
});

export default router;
