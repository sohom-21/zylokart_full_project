"use client";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SellerDoughnutChart({ data, loading }) {
  // Example static data, replace with props.data if dynamic
  const chartData = data || {
    labels: ["Completed", "Processing", "Cancelled"],
    datasets: [
      {
        label: "Order Status",
        data: [12, 7, 3],
        backgroundColor: [
          "rgba(34,197,94,0.7)",   // green-500
          "rgba(251,191,36,0.7)",  // yellow-400
          "rgba(239,68,68,0.7)",   // red-500
        ],
        borderColor: [
          "rgba(34,197,94,1)",
          "rgba(251,191,36,1)",
          "rgba(239,68,68,1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      {loading ? (
        <div className="text-center text-gray-400 py-10">Loading chart...</div>
      ) : (
        <Doughnut data={chartData} />
      )}
    </div>
  );
}