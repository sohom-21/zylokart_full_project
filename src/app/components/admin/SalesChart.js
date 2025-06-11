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
        },
        ticks: {
          callback: function(value) {
            return '$' + value + 'k'
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
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
        backgroundColor: '#3b82f6',
        borderRadius: 4,
        barThickness: 20,
      },
      {
        label: 'Last Year',
        data: [45, 49, 60, 61, 36, 35, 20, 45, 49, 60, 61, 36],
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Total Sales</span>
          <span className="text-2xl font-bold text-gray-900">$47,890</span>
        </div>
      </div>
      
      <div className="h-80">
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}

export default SalesChart
