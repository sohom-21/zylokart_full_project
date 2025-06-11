'use client'
import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const TrafficChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
    },
    cutout: '70%',
  }
  const data = {
    labels: ['Desktop', 'Tablet', 'Phone'],
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
        ],
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Traffic Source</h3>
      </div>
      
      <div className="relative h-48 mb-6">
        <Doughnut options={options} data={data} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">100%</p>
            <p className="text-sm text-gray-500">Total</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {data.labels.map((label, index) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
              />
              <span className="text-sm text-gray-600">{label}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {data.datasets[0].data[index]}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrafficChart
