<template>
  <header class="flex justify-between items-center p-4">
    <div>
      <h1 class="text-2xl header-text-color">Good Morning Anima</h1>
      <p class="subheader-text-color text-md">Hope you have a good day</p>
    </div>

    <div class="flex items-center space-x-6">
      <img
        src="../assets/search.svg"
        alt="Search"
        class="w-6 h-6 rounded-full me-8 cursor-pointer"
      />

      <img
        src="../assets/bell.svg"
        alt="Bell"
        class="w-6 h-6 rounded-full me-8 cursor-pointer"
      />

      <div class="relative">
        <div class="flex">
          <img
            src="../assets/avatar.png"
            alt="User"
            class="w-12 h-12 rounded-full me-2"
          />

          <button
            @click="userMenuOpen = !userMenuOpen"
            class="flex items-center space-x-2"
          >
            <img
              src="../assets/chevron.svg"
              alt="Dropdown"
              class="w-6 h-6 cursor-pointer transition-transform duration-300"
              :class="{ 'rotate-180': userMenuOpen }"
            />
          </button>
        </div>

        <div
          v-if="userMenuOpen"
          class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2"
        >
          <button
            class="block w-full text-left px-4 py-2 text-[#828282] hover:bg-gray-100 cursor-pointer"
          >
            Profile
          </button>
          <button
            class="block w-full text-left px-4 py-2 text-[#828282] hover:bg-gray-100 cursor-pointer"
          >
            Settings
          </button>
          <button
            class="block w-full text-left px-4 py-2 text-[#828282] hover:bg-gray-100 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref } from "vue";

const userMenuOpen = ref(false);
</script>
<style lang="css" scoped>
.header-text-color {
  color: rgba(35, 38, 47, 1);
}

.subheader-text-color {
  color: rgba(130, 130, 130, 1);
}
</style>
