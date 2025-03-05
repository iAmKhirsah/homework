import { defineStore } from "pinia";
import { ref } from "vue";

export const useTeamsStore = defineStore("teams-store", () => {
  const teamsChartData = ref({
    labels: ["a", "b", "c", "d"],
    data: [1, 5, 3, 10],
    text: ["Marketing", "HR", "Developers", "Design"],
    backgroundColors: ["#FABE7A", "#F6866A", "#59E6F6", "#7661E2"],
  });

  return { teamsChartData };
});
