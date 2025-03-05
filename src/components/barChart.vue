<template>
  <div
    class="rounded-lg p-6 flex flex-col w-full h-full border border-[#E6E8EC]"
  >
    <h2 class="text-lg text-[#23262F] font-semibold">Teams Strength</h2>

    <div class="relative flex-grow mt-10 w-full h-[240px]">
      <canvas ref="chartRef" class="w-full h-full"></canvas>
    </div>

    <div class="mt-4 ms-7 me-6 grid grid-cols-2 gap-3">
      <div v-for="(label, index) in teamsChartData.labels" :key="index">
        <div class="flex items-center space-x-2">
          <span
            class="w-6.5 h-6.5 text-white text-center text-xs font-bold rounded inline-grid place-items-center align-middle"
            :class="`bg-[${teamsChartData.backgroundColors[index]}]`"
            >{{ label }}</span
          >
          <span class="text-[#828282] font-semibold">{{
            teamsChartData.text[index]
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import Chart from "chart.js/auto";
import { storeToRefs } from "pinia";
import { useTeamsStore } from "../stores/useTeamsStore";

const { teamsChartData } = storeToRefs(useTeamsStore());

const chartRef = ref(null);
let chartInstance = null;

onMounted(async () => {
  await nextTick();

  if (chartRef.value) {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartRef.value.getContext("2d");

    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: teamsChartData.value.labels,
        datasets: [
          {
            data: teamsChartData.value.data,
            backgroundColor: teamsChartData.value.backgroundColors,
            borderRadius: 10,
            barPercentage: 0.8,
            categoryPercentage: 0.9,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 20,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
          },
          y: {
            grid: { display: false },
            ticks: { display: false },
            border: { display: false },
            suggestedMax: 12,
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
      plugins: [
        {
          id: "datalabels",
          afterDatasetsDraw(chart) {
            const { ctx } = chart;
            chart.data.datasets.forEach((dataset, i) => {
              const meta = chart.getDatasetMeta(i);
              meta.data.forEach((bar, index) => {
                const value = dataset.data[index];
                const x = bar.x;
                const y = bar.y - 5;

                ctx.fillStyle = "#828282";
                ctx.font = "bold 12px";
                ctx.textAlign = "center";
                ctx.fillText(value, x, Math.max(y, 20));
              });
            });
          },
        },
      ],
    });
  }
});
</script>
