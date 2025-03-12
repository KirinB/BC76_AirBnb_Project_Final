import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React from "react";
import { Pie } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
const UserChartRole = ({ listUser }) => {
  const { t } = useTranslation("dashboard");
  const adminCount = Array.isArray(listUser)
    ? listUser.filter((item) => item.role === "ADMIN").length
    : 0;

  const userCount = Array.isArray(listUser)
    ? listUser.filter((item) => item.role === "USER").length
    : 0;
  const chartData = {
    labels: ["Admin", "User"],
    datasets: [
      {
        data: [adminCount, userCount],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: "#000",
        font: {
          weight: "semi-bold",
        },
      },
    },
  };

  return (
    <div>
      <h3 className="text-black/70 dark:text-black/70">{t("totalUsers")}</h3>
      <p className="text-lg">{listUser.length}</p>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default UserChartRole;
