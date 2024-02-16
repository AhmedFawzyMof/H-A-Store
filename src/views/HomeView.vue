<template>
  <carousel :items-to-show="1" class="mt-5 mb-5">
    <slide v-for="product in latestProducts" :key="product.id">
      <router-link
        :to="'/products/' + product.slug"
        class="w-[80%] h-52 bg-slate-500 flex items-center justify-center rounded-lg"
      >
        <h1 class="text-4xl text-white">Offers Up To 50%</h1>
      </router-link>
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
  <div id="product-collection">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in latestProducts"
          v-bind:key="product.id"
          v-bind:product="product"
        />
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
export default {
  name: "HomeView",
  components: {
    ProductCard,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      latestProducts: [],
    };
  },
  mounted() {
    this.getLatestProducts();
    document.title = "HAstore";
  },
  methods: {
    async getLatestProducts() {
      await axios.get("/allproducts").then((response) => {
        const Products = response.data.Products;
        this.latestProducts = Products;
      });
    },
  },
};
</script>
