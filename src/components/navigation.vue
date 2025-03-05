<template>
  <div class="flex flex-col w-64">
    <div class="flex items-center px-6 py-4">
      <img src="../assets/logo.svg" alt="Teamify Logo" class="w-6 h-6" />
      <span class="ml-2 text-xl font-bold text-[#6956E5]">Teamify</span>
    </div>

    <ul class="flex flex-col space-y-1 px-4 py-6">
      <li v-for="(item, index) in menuItems" :key="item.label">
        <div
          class="flex items-center px-4 py-2 rounded-lg transition cursor-pointer"
          :class="
            index === 0
              ? 'bg-purple-100 text-[#6956E5] font-bold'
              : 'text-[#878787] font-medium hover:bg-purple-100'
          "
        >
          <img :src="item.iconSvg" alt="icon" class="w-5 h-5 mr-3" />
          {{ item.label }}
        </div>

        <hr v-if="index === 3" class="my-2 border-t border-[#C4C4C4]" />
      </li>
    </ul>

    <div class="mt-auto px-4 pb-6 flex flex-col items-center">
      <div
        class="relative flex flex-col items-center justify-end p-4 rounded-lg outer-share-box"
      >
        <img
          src="../assets/lamp.svg"
          alt="Lamp"
          class="w-40 absolute -top-10"
        />
        <button
          class="w-full flex items-center bg-white mx-8 justify-center py-2 text-[#6956E5] font-semibold rounded-lg transition"
        >
          Share Your Thoughts
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const menuItems = ref([
  {
    label: "Dashboard",
    iconSvg: new URL("../assets/dashboard.svg", import.meta.url).href,
  },
  {
    label: "Teams",
    iconSvg: new URL("../assets/teams.svg", import.meta.url).href,
  },
  {
    label: "Employees",
    iconSvg: new URL("../assets/employees.svg", import.meta.url).href,
  },
  {
    label: "Projects",
    iconSvg: new URL("../assets/projects.svg", import.meta.url).href,
  },
  {
    label: "Meetings",
    iconSvg: new URL("../assets/meetings.svg", import.meta.url).href,
  },
  {
    label: "Tasks",
    iconSvg: new URL("../assets/tasks.svg", import.meta.url).href,
  },
  {
    label: "Settings",
    iconSvg: new URL("../assets/settings.svg", import.meta.url).href,
  },
]);
</script>
<style lang="css" scoped>
.outer-share-box {
  background-color: #6956e51a;
  height: 160px;
  width: 220px;
}
</style>
