import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function HomePage() {
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


  return (
    <div className="flex flex-col min-h-screen items-center">
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                  Welcome to Globo Store
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Discover our latest collection of premium products. Quality meets style in every item.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link to="#">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" >Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black">
          <div className=" px-4 md:px-6 flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.isArray(data) && data.map((product) => (
                <Card key={product._id}>
                  <CardHeader>
                    <img
                      alt={product.name}
                      className="object-cover w-full h-60"
                      height="300"
                      src={product.image || `/placeholder.svg?height=300&width=300`}
                      style={{ aspectRatio: "300/300", objectFit: "cover" }}
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{product.name}</CardTitle>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <Button variant="outline">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Stay Updated
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Subscribe to our newsletter for exclusive deals and new product announcements.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 Globo Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
