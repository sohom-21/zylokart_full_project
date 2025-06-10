"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SellerDashboardChart() {
  const data = {
    labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
    datasets: [
      {
        label: "Visitors",
        data: [12000, 19000, 30000, 25000, 40000, 32000],
        fill: true,
        backgroundColor: "rgba(139,92,246,0.1)", // violet-500/10
        borderColor: "#7c3aed", // violet-600
        tension: 0.4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#7c3aed",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => (value >= 1000 ? value / 1000 + "k" : value),
        },
        grid: { color: "#e5e7eb" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Line data={data} options={options} />
    </div>
  );
}