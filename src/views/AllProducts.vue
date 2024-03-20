<template>
  <div class="flex ml-2 sm:ml-10 mt-5 z-0">
    <div class="relative">
      <details class="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
        >
          <span class="text-sm font-medium"> Filter </span>

          <span class="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div
          class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
        >
          <div class="w-72 sm:w-96 rounded border border-gray-200 bg-white">
            <form
              @submit.prevent="Filters"
              class="border-t border-gray-200 p-4"
            >
              <div class="flex justify-between gap-4">
                <label for="FilterPriceFrom" class="flex items-center gap-2">
                  <span class="text-sm text-gray-600">EGP</span>

                  <input
                    type="number"
                    id="FilterPriceFrom"
                    v-model="min_price"
                    required
                    placeholder="From"
                    class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </label>

                <label for="FilterPriceTo" class="flex items-center gap-2">
                  <span class="text-sm text-gray-600">EGP</span>

                  <input
                    type="number"
                    id="FilterPriceTo"
                    v-model="max_price"
                    placeholder="To"
                    required
                    class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </label>
              </div>
              <div class="flex justify-between w-full mt-5">
                <label for="Category" class="flex items-center w-full gap-2">
                  <span class="text-sm text-gray-600">Category</span>

                  <select
                    type="number"
                    v-model="Thecategory"
                    id="Category"
                    required
                    class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-white"
                  >
                    <option value="" class="text-center" disabled selected>
                      Select Category
                    </option>
                    <option
                      v-for="category in categoris"
                      class="text-center"
                      :value="category.name"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </label>
              </div>
              <button
                type="submit"
                class="mt-5 w-full text-center bg-red-600 h-10 rounded text-white"
              >
                Filter
              </button>
            </form>
          </div>
        </div>
      </details>
    </div>
  </div>
  <div class="notfound" v-if="this.allproducts.length == 0">
    <h1 class="subtitle">not found please try again</h1>
  </div>
  <div
    class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
    v-else
  >
    <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCard
        v-for="product in allproducts"
        v-bind:key="product.id"
        v-bind:product="product"
      />
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";
export default {
  name: "AllProducts",
  components: { ProductCard },
  data() {
    return {
      allproducts: [],
      categoris: [],
      Thecategory: "",
      min_price: "",
      max_price: "",
      productname: "",
    };
  },
  mounted() {
    this.getAllCategoris();
    this.getAllProducts();

    document.title = "All Products | H&A";
  },
  methods: {
    async getAllCategoris() {
      await axios.get("/allcategories").then((response) => {
        this.categoris = response.data.Categories;
      });
    },
    async Filters() {
      const Data = {
        category: this.Thecategory,
        min_price: this.min_price,
        max_price: this.max_price,
      };

      if (Data.min_price == "") {
        Data.min_price = 0;
      } else {
        Data.min_price = parseInt(this.min_price);
      }

      if (Data.max_price == "") {
        Data.max_price = 0;
      } else {
        Data.max_price = parseInt(this.max_price);
      }

      axios.post("/filter", Data).then((response) => {
        const Products = response.data.Products;

        this.allproducts = Products;
      });
    },

    async getAllProducts() {
      this.$store.state.loading = true;
      await axios.get("/allproducts").then((response) => {
        const Products = response.data.Products;

        this.allproducts = Products;
      });

      this.$store.state.loading = false;
    },
  },
};
</script>
