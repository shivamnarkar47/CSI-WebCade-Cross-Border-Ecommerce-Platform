import { getCookie } from '@/lib/getUser'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Star } from "lucide-react"

const products = [
  { id: 1, name: "Wireless Earbuds", price: 79.99, rating: 4.5, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Smart Watch", price: 199.99, rating: 4.2, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Bluetooth Speaker", price: 59.99, rating: 4.0, image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Laptop Backpack", price: 49.99, rating: 4.7, image: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "Fitness Tracker", price: 89.99, rating: 4.3, image: "/placeholder.svg?height=200&width=200" },
  { id: 6, name: "Portable Charger", price: 29.99, rating: 4.6, image: "/placeholder.svg?height=200&width=200" },
]
const Dashboard = () => {
  const [cartItems, setCartItems] = useState(0)

  const addToCart = () => {
    setCartItems(cartItems + 1)
  }
  const user = getCookie('user')
  if (user !== null) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center">
                          </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col justify-between">
                <CardHeader>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <div className="flex items-center mt-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={addToCart}>Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    )
  } else {
    return <Navigate to={"/"} replace />
  }
}

export default Dashboard
