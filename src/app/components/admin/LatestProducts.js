"use client";
import React from "react";
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";

const LatestProducts = () => {
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "Electronics",
      price: "$999",
      sales: 145,
      change: "+12%",
      isPositive: true,
      image: "/products/iphone.jpg",
    },
    {
      id: 2,
      name: "MacBook Air M2",
      category: "Computers",
      price: "$1,199",
      sales: 89,
      change: "+8%",
      isPositive: true,
      image: "/products/macbook.jpg",
    },
    {
      id: 3,
      name: "AirPods Pro",
      category: "Audio",
      price: "$249",
      sales: 67,
      change: "-5%",
      isPositive: false,
      image: "/products/airpods.jpg",
    },
    {
      id: 4,
      name: "iPad Pro",
      category: "Tablets",
      price: "$799",
      sales: 54,
      change: "+15%",
      isPositive: true,
      image: "/products/ipad.jpg",
    },
    {
      id: 5,
      name: "Apple Watch",
      category: "Wearables",
      price: "$399",
      sales: 43,
      change: "+3%",
      isPositive: true,
      image: "/products/watch.jpg",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Latest Products</h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">
                Product
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">
                Category
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">
                Price
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">
                Sales
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const ChangeIcon = product.isPositive
                ? ArrowUpRight
                : ArrowDownRight;
              return (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-gray-600">
                          {product.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-gray-600">
                    {product.category}
                  </td>
                  <td className="py-4 px-2 font-medium text-gray-900">
                    {product.price}
                  </td>
                  <td className="py-4 px-2 text-gray-600">{product.sales}</td>
                  <td className="py-4 px-2">
                    <div
                      className={`flex items-center ${
                        product.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <ChangeIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">
                        {product.change}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestProducts;
