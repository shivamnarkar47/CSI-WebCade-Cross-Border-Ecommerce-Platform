//@ts-nocheck
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "./ui/button"
// import { Card, CardContent } from "./ui/card"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { requestUrl } from "@/request"

const ProductDashboard = () => {
  const {productId} = useParams();
  const [product,setProduct] = useState([]);
  useEffect(()=>{
    requestUrl({method:"GET",url:`products/getProductById/${productId}`}).then((res)=>{
      console.log(res.data)
      setProduct(res.data.product)
    }).catch((e)=>console.log(e))
  },[])
  // const product = {
  //   name: "Wireless Noise-Cancelling Headphones",
  //   price: 299.99,
  //   description: "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancelling technology, these headphones provide an immersive listening experience whether you're commuting, working, or relaxing at home.",
  //   rating: 4.5,
  //   image: "/placeholder.svg?height=400&width=400",
  // }

 
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <img
            alt={product.name}
            className="w-full h-auto object-cover"
            height="400"
            src={product.image}
            style={{
              aspectRatio: "400/400",
              objectFit: "cover",
            }}
            width="400"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
              />
            ))}
            <span className="text-gray-600">({product.rating})</span>
          </div>
          <p className="text-2xl font-bold">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          <Button className="w-full md:w-auto">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>

  )
}

export default ProductDashboard
