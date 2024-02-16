<template>
  <div
    class="w-full px-5 mt-10 mb-10 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:gap-3 sm:place-items-center"
  >
    <div class="details w-full sm:col-start-1">
      <h1 class="text-2xl">{{ product.name }}</h1>
      <p class="text-stone-700 text-sm pt-5">{{ product.description }}</p>
      <p class="mt-3">
        Tags:
        <router-link
          class="ml-5 group relative inline-block focus:outline-none focus:ring"
          :to="'/tag/' + product.tag"
        >
          <span
            class="absolute rounded inset-0 translate-x-1.5 translate-y-1.5 bg-indigo-500 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
          ></span>

          <span
            class="relative rounded inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75"
          >
            {{ product.tag }}
          </span>
        </router-link>
      </p>
      <div class="colors mt-6 grid grid-rows-2" v-if="colors">
        <h3 class="row-start-1 w-full">Colors:</h3>
        <fieldset class="flex flex-wrap gap-3">
          <label
            v-for="color in product.colors"
            :for="'Color' + color"
            :class="
              color == 'black'
                ? 'block h-8 w-8 cursor-pointer rounded-full bg-' +
                  color +
                  ' shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-black has-[:checked]:ring-offset-2'
                : 'block h-8 w-8 cursor-pointer rounded-full bg-' +
                  color +
                  '-600 shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-black has-[:checked]:ring-offset-2'
            "
          >
            <input
              type="radio"
              name="Colors"
              :value="color"
              :id="'Color' + color"
              class="sr-only"
              v-model="this.color"
              @input="colorChicked(color)"
            />

            <span class="sr-only"> {{ color }} </span>
          </label>
        </fieldset>
      </div>
    </div>
    <div
      class="image w-full mt-10 sm:col-start-2 sm:row-span-2 sm:mt-0 grid grid-cols-4 grid-rows-5 sm:grid-rows-4 sm:grid-cols-5 place-items-center gap-3"
    >
      <img
        class="rounded-lg shadow-lg max-h-96 col-span-4 row-span-4"
        :src="this.image"
        :alt="product.name"
      />
      <img
        v-for="image in product.image"
        @click="chingeImage(image)"
        :src="image"
        class="mt-2 rounded-lg shadow-lg cursor-pointer"
      />
    </div>
    <div class="price-container w-full mt-5 sm:col-start-1">
      <h1>{{ product.price }} EGP</h1>
      <div class="mt-5">
        <label for="Quantity" class="sr-only"> Quantity </label>

        <div class="flex items-center rounded border border-gray-200">
          <button
            @click="decreaseQuantity()"
            type="button"
            class="h-10 w-2/5 text-center leading-10 text-gray-600 transition hover:opacity-75"
          >
            <i class="bx bx-minus"></i>
          </button>

          <input
            type="number"
            id="Quantity"
            :value="this.quantity"
            class="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />

          <button
            @click="increaseQuantity()"
            type="button"
            class="h-10 w-2/5 text-center leading-10 text-gray-600 transition hover:opacity-75"
          >
            <i class="bx bx-plus"></i>
          </button>
        </div>
      </div>
      <button
        @click="addToCart()"
        class="mt-5 block w-full rounded bg-indigo-500 p-4 text-sm text-white font-medium transition hover:scale-105"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Product",
  data() {
    return {
      product: {},
      image: "",
      color: "",
      colors: false,
      quantity: 1,
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    increaseQuantity() {
      if (this.quantity <= 19) {
        this.quantity++;
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    chingeImage(image) {
      this.image = image;
    },
    colorChicked(color) {
      this.color = color;
      this.product.image.forEach((image) => {
        if (image.includes(color)) {
          this.image = image;
        }
      });
    },
    async getProduct() {
      const prod_slug = this.$route.params.product_slug;

      await axios.get(`/products/${prod_slug}`).then((response) => {
        const Products = response.data.Products;
        let product = {};
        Products.forEach((Product) => {
          product["id"] = Product.id;
          product["category"] = Product.category;
          product["name"] = Product.name;
          product["description"] = Product.description;
          product["image"] = [];
          product["colors"] = [];
          product["price"] = Product.price;
          product["slug"] = Product.slug;
          product["tag"] = Product.tag;
        });
        for (let i = 0; i < Products.length; i++) {
          const p = Products[i];

          product.image.push(p.image);
          product.colors.push(p.color.String);
        }
        if (product.colors.length > 1) {
          this.colors = true;
        }

        this.image = product.image[0];
        this.color = product.colors[0];
        document.title = product.name;
        this.product = product;
      });
    },
    addToCart() {
      const product = {
        id: this.product.id,
        name: this.product.name,
        image: this.image,
        slug: this.product.slug,
        price: this.product.price,
      };
      if (this.color != "") {
        const item = {
          product: product,
          quantity: this.quantity,
          color: this.color,
        };
        this.$store.commit("addToCart", item);
        return;
      }
      const item = {
        product: product,
        quantity: this.quantity,
      };
      this.$store.commit("addToCart", item);
    },
    setIsLoading(state, status) {
      state.isLoading = status;
    },
  },
};
</script>

<style>
.color {
  width: 50px;
  height: 20px;
}
.red {
  background: red;
}
.bg-gray-600 {
  background: gray;
}
.blue {
  background: blue;
}
.black {
  background: black;
}
.colorInput {
  display: none;
}
</style>
