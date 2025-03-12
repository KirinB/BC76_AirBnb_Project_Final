import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
const UserChartGender = ({ listUser }) => {
  const { t } = useTranslation("dashboard");
  const maleCount = Array.isArray(listUser)
    ? listUser.filter((item) => item.gender === true).length
    : 0;

  const femaleCount = Array.isArray(listUser)
    ? listUser.filter((item) => item.gender === false).length
    : 0;

  const chartData = {
    labels: [t("male"), t("female")],
    datasets: [
      {
        data: [maleCount, femaleCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };
  const ChartOptions = {
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
      <h3 className="text-black/70 dark:text-black/70">{t("gender")}</h3>
      <p className="text-lg">{listUser.length}</p>
      <Pie options={ChartOptions} data={chartData} />
    </div>
  );
};

export default UserChartGender;
