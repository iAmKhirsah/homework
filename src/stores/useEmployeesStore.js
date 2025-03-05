import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useEmployeesStore = defineStore("employees-store", () => {
  const employeesChartData = ref([
    {
      label: "Total",
      value: 3254,
      color: ["#F8C07F", "#F3E48B"],
      radius: "90%",
      rotation: 0,
    },
    {
      label: "Active",
      value: 3000,
      color: ["#FB896B", "#F5B78B"],
      radius: "90%",
      rotation: -10,
    },
    {
      label: "Inactive",
      value: 254,
      color: ["#6956E5", "#AF87D9"],
      radius: "90%",
      rotation: -60,
    },
  ]);

  return { employeesChartData };
});
