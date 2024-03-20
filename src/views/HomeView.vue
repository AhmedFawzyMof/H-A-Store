<template>
  <carousel
    :items-to-show="1"
    :autoplay="5000"
    :pauseAutoplayOnHover="true"
    :touchDrag="true"
    :wrapAround="true"
    class="mt-5 mb-5"
  >
    <slide v-for="(slide, index) in slides" :key="index">
      <router-link
        :to="'/products/' + slide.product"
        class="w-[80%] h-52 bg-slate-500 flex items-center justify-center rounded-lg"
      >
        <img :src="slide.img" class="h-full rounded-lg w-full" />
      </router-link>
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
  <div class="categories p-3 flex gap-5 items-center justify-center flex-wrap">
    <img
      v-for="category in categories"
      :src="category.img"
      class="w-1/4 h-[84px] flex items-center justify-center text-white rounded-full"
    />
  </div>
  <!-- <div id="product-collection">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in latestProducts"
          v-bind:key="product.id"
          v-bind:product="product"
        />
      </ul>
    </div>
  </div> -->
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
      slides: [
        { product: "Fitness-Whatchamacallit", img: "/img/slide/1.jpg" },
        { product: "Kitchen-Gear", img: "/img/slide/1.jpg" },
        { product: "Dog-Tool", img: "/img/slide/1.jpg" },
      ],
      latestProducts: [],
      categories: [],
    };
  },
  mounted() {
    this.getLatestProducts();
    document.title = "HAstore";
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
