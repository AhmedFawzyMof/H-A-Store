<template>
 <div class="loading" v-if="this.$store.state.loading">
  <img class="logo" src="/img/logo.png" />
      <div class="box"></div>
      <span class="loader"><span class="loader-inner"></span></span>
    </div>
  <header v-if="!this.$store.state.loading" class="bg-gray-50">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex items-center justify-end gap-4">
        <button
          @click="showMobileMenu = !showMobileMenu"
          class="mr-auto sm:hidden shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700 flex items-center justify-items-center"
        >
          <span class="sr-only">Menu</span>
          <i class="bx bx-menu-alt-left text-md"></i>
        </button>
        <div class="flex items-center gap-4">
          <form method="get" action="/search" class="relative">
            <label class="sr-only" for="search"> Search </label>

            <input
              class="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
              id="search"
              type="search"
              name="query"
              placeholder="Search website..."
            />

            <button
              type="button"
              class="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
            >
              <span class="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
          <router-link
            to="/cart"
            class="relative shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700 flex items-center justify-items-center"
          >
            <span class="sr-only">Cart</span>
            <i class="bx bx-cart-alt text-md"></i>
            <span
              v-if="cartTotalLength !== 0"
              class="absolute top-[-30%] right-[-20%] bg-red-600 text-white rounded w-5 text-center shadow-xl"
              >{{ cartTotalLength }}</span
            >
          </router-link>
        </div>

        <span
          aria-hidden="true"
          class="block h-6 w-px rounded-full bg-gray-200"
        ></span>

        <router-link to="/" class="block shrink-0">
          <span class="sr-only">Home</span>
          <img
            alt="Man"
            src="/img/logo.png"
            class="h-10 w-10 rounded-full object-cover"
          />
        </router-link>
      </div>

      <div class="mt-8 relative sm:hidden z-50">
        <div
          :class="{ flex: showMobileMenu, hidden: !showMobileMenu }"
          class="menu absolute bg-white pl-2 pr-2 pt-5 pb-5 flex gap-3 flex-col w-64 rounded-md shadow-md"
        >
          <button
            @click="(showcategory = !showcategory), (showtags = false)"
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/"
          >
            Categories <i class="bx bx-chevron-down"></i>
          </button>
          <router-link
            :class="{ flex: showcategory, hidden: !showcategory }"
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-5"
            v-for="category in this.categories"
            :to="'/category/' + category.slug"
          >
            <i class="bx bx-right-arrow-alt"></i> {{ category.name }}
          </router-link>
          <button
            @click="(showtags = !showtags), (showcategory = false)"
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/"
          >
            Tags <i class="bx bx-chevron-down"></i>
          </button>
          <router-link
            :class="{ flex: showtags, hidden: !showtags }"
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-5"
            v-for="tag in this.tags"
            :to="'/tag/' + tag.slug"
          >
            <i class="bx bx-right-arrow-alt"></i> {{ tag.name }}
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/contact"
          >
            Contact
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/about-us"
          >
            About
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/all-products"
          >
            Products
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/User/order-history"
            v-if="auth"
          >
            Order History
          </router-link>
          <div
            v-if="auth"
            class="w-full bg-indigo-700 h-10 text-white text-center flex items-center justify-center rounded"
          >
            <button @click="Logout()">Logout</button>
          </div>
          <div class="flex items-center gap-4" v-else="auth">
            <div class="grid grid-cols-2 w-full gap-5 place-items-center">
              <router-link
                class="block rounded-md bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                to="/log-in"
              >
                Login
              </router-link>
              <router-link
                class="block rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                to="/sgin-up"
              >
                Register
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <div class="menu hidden relative sm:flex gap-3 flex-row w-full">
          <button
            @click="(showcategory = !showcategory), (showtags = false)"
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/"
          >
            Categories <i class="bx bx-chevron-down"></i>
          </button>
          <div
            :class="{ flex: showcategory, hidden: !showcategory }"
            class="submenu absolute flex flex-col items-start top-10 bg-white w-60 rounded-lg p-3 shadow-lg"
          >
            <router-link
              class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2 w-full"
              v-for="category in this.categories"
              :to="'/category/' + category.name"
            >
              <i class="bx bx-right-arrow-alt"></i> {{ category.name }}
            </router-link>
          </div>
          <button
            @click="(showtags = !showtags), (showcategory = false)"
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/"
          >
            Tags <i class="bx bx-chevron-down"></i>
          </button>
          <div
            :class="{ flex: showtags, hidden: !showtags }"
            class="submenu absolute flex flex-col items-start top-10 left-24 bg-white w-60 rounded-lg p-3 shadow-lg"
          >
            <router-link
              class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2 w-full"
              v-for="tag in this.tags"
              :to="'/tag/' + tag.name"
            >
              <i class="bx bx-right-arrow-alt"></i> {{ tag.name }}
            </router-link>
          </div>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/contact"
          >
            Contact
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/about-us"
          >
            About
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/all-products"
          >
            Products
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/User/order-history"
            v-if="auth"
          >
            Order History
          </router-link>
          <div
            v-if="auth"
            class="w-36 ml-auto bg-indigo-700 h-10 text-white text-center flex items-center justify-center rounded"
          >
            <button @click="Logout()">Logout</button>
          </div>
          <div class="flex items-center gap-4 ml-auto" v-else>
            <div class="sm:flex sm:gap-4">
              <router-link
                class="block rounded-md bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                to="/log-in"
              >
                Login
              </router-link>

              <router-link
                class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-indigo-700 transition hover:bg-white hover:text-indigo-700/75 sm:block"
                to="/sgin-up"
              >
                Register
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <router-view/>
  <footer class="bg-gray-50" v-if="!this.$store.state.loading">
    <div class="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div class="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
        <div class="mx-auto max-w-sm lg:max-w-none">
          <p class="mt-4 text-center text-gray-500 lg:text-left lg:text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Praesentium natus quod eveniet aut perferendis distinctio iusto
            repudiandae, provident velit earum?
          </p>

          <div class="mt-6 flex justify-center gap-4 lg:justify-start">
            <a
              class="text-gray-700 transition hover:text-gray-700/75"
              href="https://www.facebook.com/profile.php?id=61555732587538"
              target="_blank"
              rel="noreferrer"
            >
              <span class="sr-only"> Facebook </span>

              <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a
              class="text-gray-700 transition hover:text-gray-700/75"
              href="https://github.com/AhmedFawzyMof"
              target="_blank"
              rel="noreferrer"
            >
              <span class="sr-only"> GitHub </span>

              <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        <div
          class="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left"
        >
          <div>
            <strong class="font-medium text-gray-900"> Categories </strong>

            <ul class="mt-6 space-y-1">
              <li v-for="category in this.categories">
                <router-link
                  class="text-gray-700 transition hover:text-gray-700/75"
                  :to="'/tag/' + category.name"
                >
                  {{ category.name }}
                </router-link>
              </li>
            </ul>
          </div>

          <div>
            <strong class="font-medium text-gray-900"> Tags </strong>

            <ul class="mt-6 space-y-1">
              <li v-for="tag in this.tags">
                <router-link
                  class="text-gray-700 transition hover:text-gray-700/75"
                  :to="'/tag/' + tag.name"
                >
                  {{ tag.name }}
                </router-link>
              </li>
            </ul>
          </div>

          <div>
            <strong class="font-medium text-gray-900"> Support </strong>

            <ul class="mt-6 space-y-1">
              <li>
                <router-link
                  class="text-gray-700 transition hover:text-gray-700/75"
                  to="/faq"
                >
                  FAQs
                </router-link>
              </li>

              <li>
                <router-link
                  class="text-gray-700 transition hover:text-gray-700/75"
                  to="/about-us"
                >
                  About
                </router-link>
              </li>

              <li>
                <router-link
                  class="text-gray-700 transition hover:text-gray-700/75"
                  to="/contact-us"
                >
                  Contact Us
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-16 border-t border-gray-100 pt-8">
        <p class="text-center text-xs/relaxed text-gray-500">
          © Company 2024. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showMobileMenu: false,
      showcategory: false,
      showtags: false,
      auth: false,
      categories: [],
      tags: [],
      cart: {
        items: [],
      },
    };
  },
  beforeCreate() {
    this.$store.commit("initializeStore");
    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  mounted() {
    this.cart = this.$store.state.cart;
    const token = this.$store.state.token;
    if (token) {
      this.auth = true;
    }
    this.getNavData();
  },
  methods: {
    async getNavData() {
      this.$store.state.loading = true
      await axios.get("/navdata").then((response) => {
        this.categories = response.data.Categories;
        this.tags = response.data.Tags;
      });

      this.$store.state.loading = false
    },
    Logout() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
      this.$store.commit("removeToken");
      this.$router.push("/");
      location.reload();
    },
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0;
      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }
      return totalLength;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700&display=swap");
* {
  box-sizing: border-box;
  margin: 0%;
  padding: 0%;
  scroll-behavior: smooth;
  font-family: Cairo, Raleway;
}
.menu {
  transform: translateY(-20px);
}

.loading {
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  background: #fff;
  z-index: 99;
}

.loading img.logo {
    width: 205px;
}

.loader {
  display: inline-block;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 90%;
  border: 4px solid #7e7b7b;
  animation: loader 2s infinite ease;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-inner {
  0% {
    height: 0%;
  }
  25% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
  75% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
}
</style>
