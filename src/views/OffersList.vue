<template>
  <el-carousel
    :interval="4000"
    type="card"
    height="400px"
    style="overflow-x: auto"
  >
    <el-carousel-item class="offer-page" v-for="item in items" :key="item.id">
      <div class="offer-item">
        <img :src="item.image" class="offer-item-image" />
        <div class="offer-item-content">
          <h3 class="offer-item-title">{{ item.title }}</h3>
          <p class="offer-item-description">{{ item.description }}</p>
          <div class="offer-item-details">
            <h4 class="offer-item-price">{{ item.price }}</h4>
            <h5 class="offer-item-offer">{{ item.offer }}</h5>
          </div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          title: "Pizza",
          description: "Delicious pizza topped with cheese and pepperoni.",
          price: "$10",
          offer: "20% Off",
          image:
            "https://th.bing.com/th?id=OIP.2dhr5Ln6cMHIu9SmwE_uBgHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
        },
        {
          id: 2,
          title: "Burger",
          description: "Juicy beef burger with lettuce, tomato, and cheese.",
          price: "$8",
          offer: "Buy One Get One Free",
          image:
            "https://th.bing.com/th?id=OIP.F6VyuMUgr0Rx8wTNPJ8mBAHaIu&w=230&h=271&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
        },
        {
          id: 3,
          title: "Sushi",
          description: "Fresh sushi rolls with salmon, avocado, and rice.",
          price: "$15",
          offer: "Special Offer: Get a free appetizer",
          image:
            "https://th.bing.com/th/id/OIP.Q1AzAEuZZzQ7jiBNO55LfQHaHa?rs=1&pid=ImgDetMain",
        },
      ],
      isLargeScreen: window.innerWidth >= 600, // Check screen width
    };
  },
  created() {
    // Update isLargeScreen on window resize
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    // Remove event listener to prevent memory leaks
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.isLargeScreen = window.innerWidth >= 600;
    },
  },
};
</script>

<style scoped></style>
