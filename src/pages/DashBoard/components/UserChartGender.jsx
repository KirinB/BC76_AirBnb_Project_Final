import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);
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
  return (
    <div>
      <h3 className="text-black/70 dark:text-black/70">{t("gender")}</h3>
      <p className="text-lg">{listUser.length}</p>
      <Doughnut data={chartData} />
    </div>
  );
};

export default UserChartGender;
