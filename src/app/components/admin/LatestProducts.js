'use client'
import React from 'react'
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const LatestProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Healthcare Erbology',
      description: 'Updated about 6 hours ago',
      avatar: 'H'
    },
    {
      id: 2,
      name: 'Makeup Lancome Rouge',
      description: 'Updated 2 days ago',
      avatar: 'M'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Latest Products</h3>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">{product.avatar}</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestProducts
