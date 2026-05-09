<template>
  <div class="logo-container">
    <svg
      width="120"
      height="200"
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Basket Handle -->
      <path
        d="M90 120 Q150 40 210 120"
        fill="none"
        stroke="#333"
        stroke-width="10"
        stroke-linecap="round"
      />

      <!-- Basket Body -->
      <rect
        x="70"
        y="120"
        width="160"
        height="110"
        rx="12"
        fill="#f28c28"
        stroke="#333"
        stroke-width="6"
      />

      <!-- Basket Grid -->
      <line
        x1="100"
        y1="130"
        x2="100"
        y2="220"
        stroke="#333"
        stroke-width="4"
      />
      <line
        x1="130"
        y1="130"
        x2="130"
        y2="220"
        stroke="#333"
        stroke-width="4"
      />
      <line
        x1="160"
        y1="130"
        x2="160"
        y2="220"
        stroke="#333"
        stroke-width="4"
      />
      <line
        x1="190"
        y1="130"
        x2="190"
        y2="220"
        stroke="#333"
        stroke-width="4"
      />

      <line x1="80" y1="155" x2="220" y2="155" stroke="#333" stroke-width="4" />
      <line x1="80" y1="185" x2="220" y2="185" stroke="#333" stroke-width="4" />

      <!-- Grocery Items -->
      <!-- Apple -->
      <circle cx="115" cy="105" r="18" fill="#e63946" />
      <path
        d="M115 87 Q120 75 130 82"
        fill="none"
        stroke="#2a9d8f"
        stroke-width="4"
      />

      <!-- Bottle -->
      <rect x="145" y="70" width="22" height="50" rx="5" fill="#457b9d" />
      <rect x="150" y="58" width="12" height="15" rx="3" fill="#1d3557" />

      <!-- Leafy Veg -->
      <ellipse cx="190" cy="95" rx="20" ry="28" fill="#2a9d8f" />
      <path d="M190 65 L190 120" stroke="#1b7f5f" stroke-width="4" />
    </svg>
    <div>
      <p class="logo-text" style="">MY</p>
      <p class="logo-text">GROCERY</p>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
};
</script>

<style scoped></style>
