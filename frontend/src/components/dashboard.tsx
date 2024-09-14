'use client'

import { Search, Menu, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DashboardComponent() {
  const orders = [
    { productId: "4421515515", orderId: "8484168451", orders: "35", location: "India", date: "12-3-20225", status: "Active" },
    { productId: "4421515515", orderId: "8484168451", orders: "35", location: "India", date: "12-3-20225", status: "Active" },
    { productId: "4421515515", orderId: "8484168451", orders: "35", location: "India", date: "12-3-20225", status: "Active" },
    { productId: "4421515515", orderId: "8484168451", orders: "35", location: "India", date: "12-3-20225", status: "Active" },
    { productId: "4421515515", orderId: "8484168451", orders: "35", location: "India", date: "12-3-20225", status: "Active" },
  ]

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
              <TableHead>Order ID</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.productId}</TableCell>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.orders}</TableCell>
                <TableCell>{order.location}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}