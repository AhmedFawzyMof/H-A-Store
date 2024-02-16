<template>
  <div id="product-collection">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in this.products"
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

export default {
  name: "Category",
  components: { ProductCard },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.getCategory();
  },
  watch: {
    $route(to, from) {
      if (to.name === "Category") {
        this.getCategory();
      }
    },
  },
  methods: {
    async getCategory() {
      const categorySlug = this.$route.params.category_slug;
      document.title = categorySlug + " | H&A";

      await axios.get(`/category/${categorySlug}`).then((response) => {
        const Products = response.data.Products;
        this.products = Products;
      });
    },
  },
};
</script>
