import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'amfe-flexible'
import 'amfe-flexible/index.js'
createApp(App).use(store).use(router).use(Antd).use(ElementPlus).mount("#app");
