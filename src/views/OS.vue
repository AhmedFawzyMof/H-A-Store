<template>
  <div class="w-full flex items-center justify-center h-screen">
    <article
      class="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 sm:w-1/2"
    >
      <div class="flex items-start sm:gap-8">
        <div
          class="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
          aria-hidden="true"
        >
          <div class="flex items-center gap-1">
            <i class="bx bx-check text-indigo-500 text-5xl"></i>
          </div>
        </div>

        <div>
          <strong
            class="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
          >
            Success
          </strong>

          <h3 class="mt-4 text-lg capitalize font-medium sm:text-xl">
            the order was made successfully thanks for purchasing (<router-link class="hover:underline hover:text-indigo-700" to="/User/order-history"> Order History </router-link>)
          </h3>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  name: "OS",
  mounted() {
    if (this.$store.state.Lang) {
      document.title = "نجاح 🎉 | H&A";
    } else {
      document.title = "Success 🎉 | H&A";
    }

    if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
  },
};
</script>

<style lang="scss">
.con {
  background: #eee;
  width: 300px;
  padding: 20px 5px;
  border-radius: 5px;
  box-shadow: -2px 2px 2px 2px #33333353;
  display: grid;
  place-items: center;
  gap: 30px;
  text-transform: capitalize;

  h1 {
    font-weight: 600;
  }

  p {
    font-size: 15px;
    font-weight: 600;
  }
}
</style>
