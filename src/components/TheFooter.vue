<template>
  <div>
    <footer class="footer1">
      <div class="container">
        <el-row :gutter="20" style="margin-left: 0px">
          <el-col :span="8">
            <h>About Us</h>
            <p>
              We are a leading company in the field of technology, providing
              innovative solutions for our clients.
            </p>
          </el-col>
          <el-col :span="8">
            <h>Contact</h>
            <p>House 553, Street 10, F10/2</p>
            <p>Cell: 0334-9553387</p>
          </el-col>
          <el-col :span="8" class="footer-column">
            <h>Follow Us</h>
            <p>
              <a
                href="https://www.linkedin.com/company/your-company"
                target="_blank"
                >LinkedIn</a
              >
            </p>
            <p>
              <a href="https://twitter.com/your_handle" target="_blank"
                >Twitter</a
              >
            </p>
            <p>
              <a href="https://www.facebook.com/your.page" target="_blank"
                >Facebook</a
              >
            </p>
            <p>
              <a href="https://www.instagram.com/your_account" target="_blank"
                >Instagram</a
              >
            </p>
            <div class="social-icons">
              <a href="https://www.facebook.com/your.page" target="_blank"
                ><i class="fab fa-facebook"></i
              ></a>
              <a href="https://twitter.com/your_handle" target="_blank"
                ><i class="fab fa-twitter"></i
              ></a>
              <a href="https://www.instagram.com/your_account" target="_blank"
                ><i class="fab fa-instagram"></i
              ></a>
            </div>
          </el-col>
        </el-row>
      </div>
    </footer>
    <footer class="footer2">
      <el-row class="el-button-footer">
        <router-link to="items-inventory">
          <el-button class="el-icon-goods"></el-button
        ></router-link>
        <router-link to="barcode-scan">
          <el-button
            style="font-size: xx-large !important"
            class="el-icon-camera"
          ></el-button
        ></router-link>
        <router-link to="shopping-cart">
          <el-button class="el-icon-box"></el-button
        ></router-link>
      </el-row>
    </footer>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    addProduct() {
      // Code to add product
    },
    scanToAdd() {
      // Code to scan and add product
    },
    removeProduct() {
      // Code to remove product
    },
    searchProduct() {
      // Code to search for product
    },
  },
};
</script>

<style scoped>
p {
  color: black;
}
</style>
