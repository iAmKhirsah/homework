import { defineStore } from "pinia";
import { ref } from "vue";

export const useDashboardStore = defineStore("dashboard-store", () => {
  const stats = ref([
    {
      value: 10,
      title: "Top 10",
      description: "Position in Dribbble",
      increase: "20% increase from last week",
      bgColor: "#FFF0E6",
    },
    {
      value: 26,
      title: "New Employees Onboarded",
      description: "New Employees Onboarded",
      increase: "15% increase from last month",
      bgColor: "#ECEAFE",
    },
    {
      value: 500,
      title: "New Clients Approached",
      description: "New Clients Approached",
      increase: "5% increase from last week",
      bgColor: "#E5F7FF",
    },
  ]);

  const notifications = ref([
    {
      id: 1,
      user: "Ellie",
      action: "joined team developers",
      date: "04 April, 2021 04:00 PM",
      avatar: "generic_user1",
    },
    {
      id: 2,
      user: "Jenny",
      action: "joined team HR",
      date: "04 April, 2021 04:00 PM",
      avatar: "generic_user2",
    },
    {
      id: 3,
      user: "Adam",
      action: "got employee of the month",
      date: "03 April, 2021 02:00 PM",
      avatar: "generic_user3",
    },
    {
      id: 4,
      user: "Robert",
      action: "joined team design",
      date: "03 April, 2021 02:00 PM",
      avatar: "generic_user4",
    },
    {
      id: 5,
      user: "Jack",
      action: "Jack joined team design",
      date: "03 April, 2021 02:00 PM",
      avatar: "generic_user5",
    },
  ]);

  return { stats, notifications };
});
