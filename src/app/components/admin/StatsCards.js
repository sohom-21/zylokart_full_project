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

const StatsCards = () => {
  const stats = [
    {
      title: 'Budget',
      value: '$24,000',
      change: '+12%',
      isPositive: true,
      icon: DollarSign,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      description: 'Since last month'
    },
    {
      title: 'Total Customers',
      value: '1,600',
      change: '+16%',
      isPositive: true,
      icon: Users,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      description: 'Since last month'
    },
    {
      title: 'Task Progress',
      value: '75.5%',
      change: '+2%',
      isPositive: true,
      icon: CheckCircle,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      description: 'Since last month'
    },
    {
      title: 'Total Profit',
      value: '$15,300',
      change: '-8%',
      isPositive: false,
      icon: TrendingUp,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      description: 'Since last month'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const ChangeIcon = stat.isPositive ? ArrowUpRight : ArrowDownRight
        
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div className={`flex items-center text-sm ${
                stat.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <ChangeIcon className="h-4 w-4 mr-1" />
                {stat.change}
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
              <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StatsCards
