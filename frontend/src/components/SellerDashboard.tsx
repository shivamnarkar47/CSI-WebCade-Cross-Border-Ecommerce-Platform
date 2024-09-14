// @ts-nocheck
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
import { Navigate, useNavigate } from "react-router-dom";
import { requestUrl } from "@/request";

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
  const navigate = useNavigate();
  console.log(user)


  useEffect(() => {
    const fetchOrders = async () => {
      requestUrl({ method: "GET", url: "orders/getOrders" }).then((res) => {
        setOrders(res.data);
        console.log(res.data)
      }).catch((e) => {
        console.log(e)
      })

    };

    fetchOrders();
  }, []);

  if (!user) {
    return <Navigate to={"/auth/v1/login"} />;
  }
  console.log(user.user.country)
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-black">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 hidden dark:bg-[#111] md:block">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <nav>
          <a href="#" className="block py-2 text-gray-600 dark:text-white hover:text-gray-800">Order list</a>
          <a href="#" className="block py-2 text-gray-600  dark:text-white hover:text-gray-800">Product list</a>
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
              <TableHead>Type of Payment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Count In Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.orderItems.map((or) => { return or.name + " " })}</TableCell>
                  <TableCell>{user.user.country === 'japan' ? "¥" + order.itemsPrice / 0.596 : (user.user.country === 'eu' ? "EUR " + order.itemsPrice / 93 : "Rs " + order.itemsPrice)}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell> {order.orderItems.map((or) => { return or.qty + " " })} </TableCell>
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
