'use client';

import React, { useState, useEffect } from 'react';
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'
import { getOrdersByUserId } from '@/app/utiils/supabase/orders';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('Please log in to view your orders');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await getOrdersByUserId(userId);
      if (error) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data || []);
      }
    } catch (err) {
      setError('An error occurred while fetching orders');
      console.error('Fetch orders error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-200 text-green-800';
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'processing':
        return 'bg-blue-200 text-blue-800';
      case 'cancelled':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  if (loading) {
    return (
      <div>
        <CustomerNavbar />
        <div className="flex justify-center items-center h-screen">
          <p>Loading orders...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <CustomerNavbar />
        <div className="flex justify-center items-center h-screen text-red-500">
          <p>{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div>
        <CustomerNavbar />
        <div className="container mx-auto p-4 min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">You haven&apos;t placed any orders yet</p>
            <a 
              href="/customer/products-listing" 
              className="bg-amber-300 text-black px-6 py-3 rounded font-medium hover:bg-amber-400 transition"
            >
              Start Shopping
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div>
    <CustomerNavbar />
    <div className="container mx-auto p-4 min-h-screen">     
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-600">Date: {formatDate(order.created_at)}</p>
            <p className="text-gray-600">Total: ₹{order.total_price.toFixed(2)}</p>
            <p className="text-gray-600">Quantity: {order.quantity}</p>
            <div className="mt-4 flex items-center gap-4">
              {order.Products?.image_url && (
                <img
                  src={order.Products.image_url}
                  alt={order.Products.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h3 className="text-md font-medium">{order.Products?.name || 'Product'}</h3>
                <p className="text-sm text-gray-500">{order.Products?.category}</p>
                <p className="text-sm text-gray-600">
                  ₹{order.Products?.price_offered || order.Products?.price} × {order.quantity}
                </p>
              </div>
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