import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectDeliveriesStore = defineStore(
  "project-deliveries-store",
  () => {
    const projectDeliveriesData = ref({
      labels: [
        "Oct 2021",
        "Nov 2021",
        "Dec 2021",
        "Jan 2022",
        "Feb 2022",
        "Mar 2022",
      ],
      datasets: [
        {
          label: "Achieved",
          data: [6, 7, 6, 8, 7, 6],
          borderColor: "#FB896B",
          backgroundColor: "rgba(251, 137, 107, 0.2)",
          borderWidth: 4,
          tension: 0.5,
          pointBackgroundColor: "#FB896B",
          tension: 0.5,
          pointRadius: 1,
          pointHoverRadius: 5,
          pointBorderWidth: 1,
        },
        {
          label: "Target",
          data: [4, 6, 5, 5, 6, 5],
          borderColor: "#6956E5",
          backgroundColor: "rgba(105, 86, 229, 0.2)",
          borderWidth: 4,
          tension: 0.5,
          pointBackgroundColor: "#6956E5",
          tension: 0.5,
          pointRadius: 1,
          pointHoverRadius: 5,
          pointBorderWidth: 1,
        },
      ],
    });

    return { projectDeliveriesData };
  }
);
