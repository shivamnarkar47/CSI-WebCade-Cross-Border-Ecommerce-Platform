
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { requestUrl } from '@/request'
import Cookies from 'js-cookie'

export default function SellerAuth() {
  const { value } = useParams();
  const [activeTab, setActiveTab] = useState(value)
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    country: "",
  };
  const [loginformData, updateLoginFormData] = useState(initialFormData);
  const [formData, updateFormData] = useState(initialFormData);

  const navigate = useNavigate();

  const handleLoginChange = (e) => {

    updateLoginFormData({
      ...loginformData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };


  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
    console.log(e.target.name + " "+ e.target.value)
  };
  const handleRegisterSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically handle form submission
    console.log('Form submitted')
    console.log(formData);
    requestUrl({ method: "POST", url: "users/registerUser", data: formData }).then((res) => {
      console.log(res.data);
      Cookies.set('user', JSON.stringify(res.data), { expires: 7, secure: true, sameSite: 'Strict' });
      navigate(`/dashboard/${res.data.user._id}`)
    })
  }

  const handleLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically handle form submission
    console.log('Login Form submitted')
    console.log(loginformData);
    requestUrl({ method: "POST", url: "users/loginUser", data: loginformData }).then((res) => {
      console.log(res.data);
      Cookies.set('user', JSON.stringify(res.data), { expires: 7, secure: true, sameSite: 'Strict' });
      navigate(`/dashboard/${res.data.user._id}`)
    })
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Seller Authentication</CardTitle>
          <CardDescription>Login or create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="Enter your email" required onChange={handleLoginChange} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" type="password" placeholder="Enter your password" required onChange={handleLoginChange} />
                  </div>
                </div>
              </form>
            </TabsContent>







            <TabsContent value="register">
              <form onSubmit={handleRegisterSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col pt-4 space-y-1.5">
                    <Label htmlFor="login-name">Full Name</Label>
                    <Input id="login-full-name" type="text" placeholder="Enter your Full Name" name="name" onChange={handleChange} required />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" type="email" placeholder="Enter your email" name='email' required onChange={handleChange} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="register-password">Password</Label>
                    <Input id="register-password" type="password" placeholder="Create a password" name='password' required onChange={handleChange} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Select onValueChange={(e) => updateFormData({ ...formData, country: e, role: "seller" })}>
                      <Label>Country</Label>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your Country" onChange={handleChange} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="india">🇮🇳 India</SelectItem>
                        <SelectItem value="japan">🇯🇵 Japan</SelectItem>
                        <SelectItem value="eu">🇪🇺 EU</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className='flex flex-col gap-5'>
          <Button className="w-full " onClick={activeTab === 'login' ? handleLoginSubmit : handleRegisterSubmit}>
            {activeTab === 'login' ? 'Login' : 'Register'}

          </Button>
          <Link to={'/auth/v1/login'}><p >Are you a buyer ? Login here</p> </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
