import { getCookie } from '@/lib/getUser'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react";


const Dashboard = () => {
  const [cartItems, setCartItems] = useState(0)
  interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }
  
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products/getProducts");
        const result = await response.json();
        console.log(result); // Log the response to see its structure
        // If result contains products as an array, use that
        setData(Array.isArray(result) ? result : result.products || []); // Safeguard for array structure
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const addToCart = () => {
    setCartItems(cartItems + 1)
  }
  const user = getCookie('user')
  const navigate = useNavigate();
  if (user !== null) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-black" >
        <header className="bg-white dark:bg-black shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center">
                          </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((product) => (
              <Card key={product._id} className='cursor-pointer' onClick={()=>navigate(`/${product._id}`)}>
                <CardHeader>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <p className="text-gray-500">{product.description}</p>
                  <p className="text-gray-500">${product.price}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={addToCart}>Add to cart</Button>
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
