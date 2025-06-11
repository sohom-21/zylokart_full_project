'use client'
import React from 'react'
import { MoreHorizontal, Package, Clock, CheckCircle, XCircle } from 'lucide-react'

const LatestOrders = () => {
  const orders = [
    {
      id: 'DEV1049',
      customer: 'Ekaterina Tankova',
      date: '11/04'
    },
    {
      id: 'DEV1048',
      customer: 'Cao Yu',
      date: '11/04'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Latest Orders</h3>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{order.id}</p>
              <p className="text-sm text-gray-500">{order.customer}</p>
            </div>
            <span className="text-sm text-gray-500">{order.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestOrders
