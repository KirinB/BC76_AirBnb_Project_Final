import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useVisitCounter } from "../../../store/VisitCounterContext";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const VisitCounterChart = () => {
  const { t } = useTranslation("dashboard");
  const { labels, weekVisits } = useVisitCounter();
  const data = {
    labels: labels,
    datasets: [
      {
        label: t("label2"),
        data: weekVisits,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl text-center mb-10">{t("chartTitle2")}</h2>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};

export default VisitCounterChart;
