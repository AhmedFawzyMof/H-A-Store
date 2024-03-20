<template>
  <carousel
    :items-to-show="width >= 1439 ? 3 : 1"
    :autoplay="5000"
    :pauseAutoplayOnHover="true"
    :touchDrag="true"
    :wrapAround="true"
    class="mt-6 mb-6"
    :class="{ 'w-[80%]  ml-auto mr-auto': width > 1439 }"
  >
    <slide v-for="(slide, index) in slides" :key="index">
      <router-link
        :to="'/products/' + slide.product"
        class="w-[90%] h-[150px] max-w-[900px] flex items-center justify-center rounded-lg"
      >
        <img :src="slide.img" class="h-full rounded-lg w-full" />
      </router-link>
    </slide>

    <template #addons>
      <pagination />
    </template>
  </carousel>
  <div
    class="categories p-3 flex gap-3 lg:gap-8 items-center justify-center flex-wrap"
  >
    <a
      class="category w-[30%] md:w-[22.5%] lg:w-[10.5%] flex flex-col"
      v-for="category in categories"
      :href="'/category/' + category.name"
    >
      <img
        :src="category.img"
        class="w-full h-[84px] flex items-center justify-center rounded-md overflow-hidden shadow-lg"
      />
      <p class="h-[50px] grid place-items-center text-center">
        {{ category.name }}
      </p>
    </a>
  </div>
  <div id="product-collection">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1>Best Selling Products</h1>
      <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in latestProducts.slice(0, 4)"
          v-bind:key="product.id"
          v-bind:product="product"
        />
      </ul>
    </div>
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1>Latest Products</h1>
      <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in latestProducts.slice(4, 8)"
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
import { Carousel, Slide, Pagination } from "vue3-carousel";
export default {
  name: "HomeView",
  components: {
    ProductCard,
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      slides: [
        { product: "Fitness-Whatchamacallit", img: "/img/slide/1.jpg" },
        { product: "Kitchen-Gear", img: "/img/slide/2.jpg" },
        { product: "Dog-Tool", img: "/img/slide/3.jpg" },
      ],
      latestProducts: [],
      categories: [],
      width: 0,
    };
  },
  mounted() {
    this.getLatestProducts();
    document.title = "البيت بيتك";
    this.width = window.innerWidth;
  },
  methods: {
    async getLatestProducts() {
      this.$store.state.loading = true;
      await axios.get("/allproducts").then((response) => {
        const Products = response.data.Products;
        this.latestProducts = Products;
      });
      await axios.get("/allcategories").then((response) => {
        const Categories = response.data.Categories;
        this.categories = Categories;
      });

      this.$store.state.loading = false;
    },
  },
};
</script>
