import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import axios from "axios";
import "./style.css";
axios.defaults.baseURL = "https://h-a-stroe-backend.onrender.com";

createApp(App).use(store).use(router, axios).mount("#app");
