import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/styles/style.css";
import app from "./app.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import { Button, Menu, Avatar, Badge, Divider } from "primevue";

const pinia = createPinia();
const vueApp = createApp(app);
vueApp.use(pinia);
vueApp.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
});

// Components
vueApp.component("Button", Button);
vueApp.component("Menu", Menu);
vueApp.component("Avatar", Avatar);
vueApp.component("Badge", Badge);
vueApp.component("Divider", Divider);

vueApp.mount("#app");
