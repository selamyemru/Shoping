import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [dashboardData, setDashboardData] = useState({
    productCount: 0,
    orderCount: 0,
    userCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        setError('Failed to fetch dashboard data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-700 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Products</h2>
                <p className="text-gray-700">Total Products: {dashboardData.productCount}</p>
                <Link to='/manageproducts' className="text-blue-500 hover:underline">Manage Products</Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Orders</h2>
                <p className="text-gray-700">Total Orders: {dashboardData.orderCount}</p>
                <Link to='/manageorders' className="text-blue-500 hover:underline">Manage Orders</Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Users</h2>
                <p className="text-gray-700">Total Users: {dashboardData.userCount}</p>
                <Link to='/manageusers' className="text-blue-500 hover:underline">Manage Users</Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
