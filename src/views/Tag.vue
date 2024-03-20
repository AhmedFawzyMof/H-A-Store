<template>
  <div id="product-collection">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in products"
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
  name: "Tag",
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.getTag();
  },
  watch: {
    $route(to, from) {
      if (to.name === "Tag") {
        this.getTag();
      }
    },
  },
  methods: {
    async getTag() {
      this.$store.state.loading = true;
      const tagSlug = this.$route.params.tag_slug;
      document.title = tagSlug + " | البيت بيتك";

      await axios.get(`/tags/${tagSlug}`).then((response) => {
        const Products = response.data.Products;

        this.products = Products;
      });

      this.$store.state.loading = false;
    },
  },
};
</script>
