'use client';

import React, { useState, useEffect } from 'react';
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching orders from an API
    const fetchOrders = async () => {
      try {
        // Replace with actual API call to fetch user orders
        const response = await new Promise(resolve => setTimeout(() => {
          resolve([
            { id: '1', date: '2023-01-15', total: 120.50, status: 'Delivered', items: ['Item A', 'Item B'] },
            { id: '2', date: '2023-02-20', total: 75.00, status: 'Processing', items: ['Item C'] },
            { id: '3', date: '2023-03-01', total: 200.00, status: 'Shipped', items: ['Item D', 'Item E', 'Item F'] },
          ]);
        }, 2000)); // Simulate 2-second API delay
        setOrders(response);
      } catch (err) {
        setError('Failed to fetch orders.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div>
    <CustomerNavbar />
    <div className="container mx-auto p-4">     
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'Delivered' ? 'bg-green-200 text-green-800' :
                order.status === 'Processing' ? 'bg-yellow-200 text-yellow-800' :
                'bg-blue-200 text-blue-800'
              }`}>
                {order.status}
              </span>
            </div>
            <p className="text-gray-600">Date: {order.date}</p>
            <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
            <div className="mt-2">
              <h3 className="text-md font-medium">Items:</h3>
              <ul className="list-disc list-inside ml-4">
                {order.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>     
    </div>
    <Footer />
    </div>
  );
};

export default OrdersPage;