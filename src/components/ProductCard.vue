<template>
  <li>
    <router-link v-bind:to="'/products/' + product.slug" class="group block">
      <img
        :src="product.image"
        alt=""
        class="h-[250px] w-full object-cover sm:h-[250px] shadow-md rounded-md"
      />

      <div class="mt-3 flex justify-between text-sm">
        <div>
          <h3
            class="text-gray-900 group-hover:underline group-hover:underline-offset-4"
          >
            {{ product.name }}
          </h3>

          <p class="mt-1.5 max-w-[45ch] text-xs text-gray-500">
            {{ product.description }}
          </p>
        </div>

        <p class="text-gray-900">{{ product.price }}L.E</p>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: Object,
  },
};
</script>
