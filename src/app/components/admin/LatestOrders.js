"use client";
import React from "react";
import {
  MoreHorizontal,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const LatestOrders = () => {
  const orders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      amount: "$299.00",
      status: "completed",
      date: "2024-01-15",
      items: 2,
    },
    {
      id: "#ORD-002",
      customer: "Sarah Smith",
      email: "sarah@example.com",
      amount: "$459.00",
      status: "pending",
      date: "2024-01-15",
      items: 1,
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      amount: "$189.00",
      status: "processing",
      date: "2024-01-14",
      items: 3,
    },
    {
      id: "#ORD-004",
      customer: "Emily Davis",
      email: "emily@example.com",
      amount: "$699.00",
      status: "completed",
      date: "2024-01-14",
      items: 1,
    },
    {
      id: "#ORD-005",
      customer: "Chris Wilson",
      email: "chris@example.com",
      amount: "$129.00",
      status: "cancelled",
      date: "2024-01-13",
      items: 2,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Latest Orders</h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">
                Order ID
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">
                Customer
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">
                Amount
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">
                Status
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-2">
                  <span className="font-medium text-blue-600">{order.id}</span>
                </td>
                <td className="py-4 px-2">
                  <div>
                    <div className="font-medium text-gray-900">
                      {order.customer}
                    </div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </div>
                </td>
                <td className="py-4 px-2 font-medium text-gray-900">
                  {order.amount}
                </td>
                <td className="py-4 px-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    <span className="ml-1 capitalize">{order.status}</span>
                  </span>
                </td>
                <td className="py-4 px-2 text-gray-600">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestOrders;
