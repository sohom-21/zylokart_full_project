'use client'
import React from 'react'
import { 
  DollarSign, 
  Users, 
  CheckCircle, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

// This file defines the StatsCards component for the admin dashboard.
// It displays key statistical metrics in card format.
const StatsCards = () => {  const stats = [
    {
      title: 'BUDGET',
      value: '$24k',
      change: '+12%',
      isPositive: true,
      icon: DollarSign,
      bgColor: 'bg-red-500',
      iconColor: 'text-white',
      description: 'Since last month'
    },
    {
      title: 'TOTAL CUSTOMERS',
      value: '1.6k',
      change: '+16%',
      isPositive: true,
      icon: Users,
      bgColor: 'bg-green-500',
      iconColor: 'text-white',
      description: 'Since last month'
    },
    {
      title: 'TASK PROGRESS',
      value: '75.5%',
      change: '+2%',
      isPositive: true,
      icon: CheckCircle,
      bgColor: 'bg-orange-500',
      iconColor: 'text-white',
      description: 'Since last month'
    },
    {
      title: 'TOTAL PROFIT',
      value: '$15k',
      change: '-8%',
      isPositive: false,
      icon: TrendingUp,
      bgColor: 'bg-blue-500',
      iconColor: 'text-white',
      description: 'Since last month'
    }
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const ChangeIcon = stat.isPositive ? ArrowUpRight : ArrowDownRight
        
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {stat.title}
              </div>
              <div className={`flex items-center text-sm font-medium ${
                stat.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <ChangeIcon className="h-4 w-4 mr-1" />
                {stat.change}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StatsCards
