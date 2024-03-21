<!-- <template>
  <el-carousel
    :interval="4000"
    type="card"
    height="370px"
    style="overflow-x: auto; margin-bottom: 20px"
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
          description: "Delicious pizza with a variety of toppings.",
          price: "$10",
          offer: "Buy 1, Get 1 Free",
          image: "https://images.unsplash.com/photo-1569180870150-ef1f8ad51d7d",
        },
        {
          id: 2,
          title: "Burger Combo",
          description: "Juicy burger served with fries and a drink.",
          price: "$8",
          offer: "20% Off",
          image: "https://images.unsplash.com/photo-1589217787259-0c2f4e97c50d",
        },
        {
          id: 3,
          title: "Sushi Platter",
          description: "Fresh assortment of sushi rolls.",
          price: "$15",
          offer: "30% Off",
          image: "https://images.unsplash.com/photo-1565299421604-7fc55f9db4e3",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style> -->
<template>
  <el-carousel
    :interval="4000"
    type="card"
    height="478px"
    style="overflow-x: auto; margin-bottom: 20px"
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
            "https://www.pngkey.com/png/full/198-1982661_pizza-png-image-background-pizza-png.png",
        },
        {
          id: 2,
          title: "Burger",
          description: "Juicy beef burger with lettuce, tomato, and cheese.",
          price: "$8",
          offer: "Buy One Get One Free",
          image:
            "https://www.pngitem.com/pimgs/m/525-5252522_transparent-burger-png-hamburger-png-png-download.png",
        },
        {
          id: 3,
          title: "Sushi",
          description: "Fresh sushi rolls with salmon, avocado, and rice.",
          price: "$15",
          offer: "Special Offer: Get a free appetizer",
          image:
            "https://www.seekpng.com/png/detail/185-1857438_sushi-transparent-background.png",
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

<style scoped>
.offer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.offer-item-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
}

.offer-item-content {
  text-align: center;
}

.offer-item-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.offer-item-description {
  font-size: 16px;
  margin-bottom: 10px;
}

.offer-item-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.offer-item-price {
  font-size: 18px;
  font-weight: bold;
}

.offer-item-offer {
  font-size: 16px;
  color: #2ecc71;
}
.offer-item {
  display: flex;
  flex-direction: column;
  background: #add8e6de;
  border-radius: 8px;
  border: inset;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
}
@media (max-width: 600px) {
  /* Styles for screens less than 600px */
  .offer-item {
    width: 100%; /* Make the offer item occupy the full width */
  }
}
</style>
