import React, { ReactNode, useEffect, useState } from "react";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCookie } from "@/lib/getUser";
import { Navigate } from "react-router-dom";

export default function SellerDashboard() {
  const user = getCookie("user");
  interface Order {
    [x: string]: ReactNode;
    productId: string;
    orderId: string;
    orders: string;
    location: string;
    date: string;
    status: string;
  }
  
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/orders/getOrders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  if (!user) {
    return <Navigate to={"/auth/v1/login"} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <nav>
          <a href="#" className="block py-2 text-gray-600 hover:text-gray-800">Order list</a>
          <a href="#" className="block py-2 text-gray-600 hover:text-gray-800">Product list</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex justify-between items-center">
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search" className="pl-8" />
          </div>
          <Button variant="outline">Active</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Count In Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.qty}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.category}</TableCell>
                  <TableCell>{order.countInStock}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {order.status}
                    </span>
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
