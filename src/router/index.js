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
import UserDefinedPrompt from "../components/UserDefinedPrompts.vue";
import FirebaseAuth from "../components/LoginSignup.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
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
router.afterEach(() => {
  setTimeout(() => {
    store.commit("setLoading", false);
  }, 1000);
});

export default router;
