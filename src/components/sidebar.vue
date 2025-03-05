<template>
  <aside class="w-full bg-white ps-4 pt-4 rounded-lg">
    <div class="space-y-4">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="p-4 rounded-md text-center"
        :style="{ backgroundColor: stat.bgColor }"
      >
        <p class="text-xl text-black font-bold">{{ stat.value }}</p>
        <p class="text-black font-medium text-sm">{{ stat.description }}</p>
        <p class="text-xs text-[#787486] font-medium">
          {{ stat.increase }}
        </p>
      </div>
    </div>

    <div class="mt-6">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold">Notifications</h2>
        <a href="#" class="text-[#6956E5] font-semibold text-sm">View All</a>
      </div>

      <div class="mt-4 space-y-3">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="flex bg-[#F9F9F9] items-center space-x-3 mb-4 p-2 rounded-sm"
        >
          <img
            :src="getImage(notification.avatar)"
            alt="User"
            class="w-10 h-10 rounded-xs"
          />
          <div>
            <p class="text-sm text-[#23262F] font-medium">
              {{ notification.user }} {{ notification.action }}
            </p>
            <p class="text-xs text-[#708099]">{{ notification.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useDashboardStore } from "../stores/useDashboardStore";

const { stats, notifications } = storeToRefs(useDashboardStore());

const getImage = (avatar) => {
  return new URL(`../assets/${avatar}.png`, import.meta.url).href;
};
</script>
