<template>
  <div class="p-6 rounded-lg w-full border border-[#E6E8EC] line-chart-shadow">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold text-[#23262F]">Project Deliveries</h2>
      <div class="flex space-x-10 me-8">
        <div class="flex items-center space-x-1">
          <span class="w-3 h-3 bg-[#FB896B] rounded-full"></span>
          <span class="text-sm text-[#6B7280]">Achieved</span>
        </div>
        <div class="flex items-center space-x-1">
          <span class="w-3 h-3 bg-[#6956E5] rounded-full"></span>
          <span class="text-sm text-[#6B7280]">Target</span>
        </div>
      </div>
    </div>
    <div class="relative flex-grow mt-10 w-full h-[220px]">
      <canvas ref="chartRef" class="w-full h-full"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Chart } from "chart.js/auto";
import { storeToRefs } from "pinia";
import { useProjectDeliveriesStore } from "../stores/useProjectDeliveriesStore";

const { projectDeliveriesData } = storeToRefs(useProjectDeliveriesStore());

const chartRef = ref(null);
let chartInstance = null;

const shadowPlugin = {
  id: "shadow",
  beforeDatasetsDraw(chart) {
    const ctx = chart.ctx;

    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);

      if (!meta.hidden && meta.type === "line") {
        ctx.save();

        const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
        gradient.addColorStop(0, dataset.borderColor);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.shadowColor = dataset.borderColor;
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 8;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = dataset.borderWidth + 2;
        ctx.strokeStyle = gradient;

        ctx.beginPath();

        const points = meta.data;

        if (points.length > 1) {
          ctx.moveTo(points[0].x, points[0].y);

          for (let j = 0; j < points.length - 1; j++) {
            const current = points[j];
            const next = points[j + 1];

            const cp1x = current.x + (next.x - current.x) * 0.5;
            const cp1y = current.y;
            const cp2x = next.x - (next.x - current.x) * 0.4;
            const cp2y = next.y;

            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next.x, next.y);
          }
        }

        ctx.stroke();
        ctx.restore();
      }
    });
  },
};

onMounted(() => {
  if (chartRef.value) {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartRef.value.getContext("2d");

    chartInstance = new Chart(ctx, {
      type: "line",
      data: projectDeliveriesData.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          axis: "x",
          mode: "nearest",
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#FFF",
            titleColor: "#23262F",
            bodyColor: "#23262F",
            bodySpacing: 6,
            padding: 12,
            usePointStyle: true,
            enabled: true,
          },
          shadow: shadowPlugin,
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            beginAtZero: true,
            max: 12,
            ticks: { stepSize: 2, color: "#6B7280" },
            grid: { color: "#F3F4F6" },
          },
        },
      },
      plugins: [shadowPlugin],
    });
  }
});
</script>
<style lang="css" scoped>
.line-chart-shadow {
  box-shadow: 0px 4px 39px 9px #51459f17;
}
</style>
