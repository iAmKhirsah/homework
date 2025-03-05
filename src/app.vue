<script setup>
import navigation from "./components/navigation.vue";
import radialBar from "./components/radialBar.vue";
import barChart from "./components/barChart.vue";
import lineChart from "./components/lineChart.vue";
import appHeader from "./components/header.vue";
import sidebar from "./components/sidebar.vue";
</script>

<template>
  <div class="flex h-screen justify-center">
    <div class="w-full flex">
      <navigation class="w-64 bg-[#F9F9F9]" />

      <div class="flex-1 flex flex-col">
        <appHeader />

        <div class="p-4 grid grid-cols-4 gap-4">
          <div class="col-span-3 grid grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg">
              <barChart />
            </div>

            <div class="bg-white p-4 rounded-lg">
              <radialBar />
            </div>

            <div class="bg-white p-4 rounded-lg col-span-2">
              <lineChart />
            </div>
          </div>

          <div class="bg-white rounded-lg flex-1">
            <sidebar />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
