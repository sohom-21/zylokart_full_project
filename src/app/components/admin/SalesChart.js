'use client'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const SalesChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        }
      },
      y: {
        grid: {
          color: '#f3f4f6',
        },
        border: {
          display: false,
        },        ticks: {
          callback: function(value) {
            return value >= 1000 ? (value/1000) + 'k' : value
          }
        }
      },
    },
  }

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const data = {
    labels,
    datasets: [
      {
        label: 'This Year',
        data: [20000, 18000, 8000, 12000, 6000, 15000, 14000, 16000, 18000, 20000, 22000, 21000],
        backgroundColor: '#3b82f6',
        borderRadius: 4,
        barThickness: 30,
      },
      {
        label: 'Last Year',
        data: [18000, 16000, 7000, 10000, 5000, 13000, 12000, 14000, 16000, 18000, 19000, 18000],
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        barThickness: 30,
      },
    ],
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sales</h3>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-blue-600 hover:text-blue-700">Sync</button>
        </div>
      </div>
      
      <div className="h-80">
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}

export default SalesChart
