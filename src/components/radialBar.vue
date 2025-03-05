<template>
  <div
    class="rounded-lg p-6 flex flex-col w-full h-full border border-[#E6E8EC]"
  >
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold text-[#23262F]">Employees</h2>
      <span class="text-[#787486] font-semibold text-sm flex text-center"
        >Aug 25 - Sept 25
        <img
          src="../assets/chevron.svg"
          alt="Dropdown"
          class="w-5 h-5 cursor-pointer chevron-color"
      /></span>
    </div>

    <div class="flex mt-10 w-full h-[240px]">
      <div class="flex flex-col justify-around space-y-4 ml-6">
        <div v-for="(data, index) in employeesChartData" :key="index">
          <div class="flex flex-col items-center">
            <div class="flex items-center space-x-2">
              <span
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: data.color[0] }"
              ></span>
              <span class="text-[#787486] text-sm">{{ data.label }}</span>
            </div>
            <span class="font-bold text-lg text-start w-full">{{
              data.value
            }}</span>
          </div>
        </div>
      </div>

      <div class="relative flex-grow flex items-center justify-center">
        <canvas ref="chartRef" class="w-full h-full"></canvas>
        <div class="absolute flex items-center justify-center">
          <img
            src="../assets/user.svg"
            alt="User"
            class="w-16 h-16 rounded-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import Chart from "chart.js/auto";
import { storeToRefs } from "pinia";
import { useEmployeesStore } from "../stores/useEmployeesStore";

const { employeesChartData } = storeToRefs(useEmployeesStore());

const chartRef = ref(null);
let chartInstance = null;

onMounted(async () => {
  await nextTick();

  if (chartRef.value) {
    if (chartInstance) {
      chartInstance.destroy();
    }
    const total = 3254;

    const endDotPlugin = {
      id: "endDot",
      afterDatasetDraw(chart, args) {
        const { ctx, chartArea } = chart;
        const meta = chart.getDatasetMeta(args.index);
        const arc = meta.data[0];

        if (!arc) return;

        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;
        const endAngle = arc.startAngle + arc.circumference;

        const adjustedRadius = arc.outerRadius + 5;

        let dotX = centerX + Math.cos(endAngle) * adjustedRadius;
        let dotY = centerY + Math.sin(endAngle) * adjustedRadius;

        const angleDegrees = (endAngle * 180) / Math.PI;

        if (angleDegrees > 90 && angleDegrees < 259) {
          dotY += 8;
        } else if (angleDegrees > 260) {
          dotY += 4;
        } else {
          dotX += 8;
        }

        ctx.beginPath();
        ctx.arc(dotX, dotY, 7, 0, Math.PI * 2);
        ctx.fillStyle = employeesChartData.value[args.index].color[0];
        ctx.fill();
      },
    };

    const thinArcPlugin = {
      id: "thinArc",
      beforeDatasetDraw(chart, args) {
        const meta = chart.getDatasetMeta(args.index);

        meta.data.forEach((arc) => {
          const thickness = 12;

          arc.outerRadius = arc.innerRadius + thickness;
        });
      },
    };

    chartInstance = new Chart(chartRef.value.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: employeesChartData.value.map((d) => d.label),
        datasets: employeesChartData.value.map((d) => ({
          label: d.label,
          data: [d.value, total - d.value],
          backgroundColor: (ctx) => {
            const chart = ctx.chart;
            const { width, height } = chart;
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 2;

            const gradient = chart.ctx.createRadialGradient(
              centerX,
              centerY,
              radius * 0.3,
              centerX,
              centerY,
              radius
            );

            gradient.addColorStop(0, "#FFF");
            gradient.addColorStop(0.4, d.color[0]);
            gradient.addColorStop(0.6, d.color[0]);
            gradient.addColorStop(1, "#FFF");

            return [gradient, "rgba(0,0,0,0)"];
          },

          borderWidth: 8,
          borderColor: "#FFF",
          hoverBorderColor: "#FFF",
          rotation: d.rotation,
          cutout: "40%",
          borderRadius: 25,
          spacing: 8,
          borderRadius: 20,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: true,
          animateScale: true,
        },
        elements: {
          arc: {
            borderJoinStyle: "round",
            borderCapStyle: "round",
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
      plugins: [endDotPlugin, thinArcPlugin],
    });
  }
});
</script>
<style lang="css" scoped>
.chevron-color {
  filter: invert(50%) sepia(9%) saturate(549%) hue-rotate(213deg)
    brightness(90%) contrast(93%);
}
</style>
