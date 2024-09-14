//@ts-ignore
import Cookies from 'js-cookie'
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

export default function AuthPage() {
  const { value } = useParams();
  const [activeTab, setActiveTab] = useState(value)
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

   console.log(activeTab)



  const initialFormData = {
    name: "",
    email: "",
    password: "",
    country: "",
    role:"buyer"
  };
  const [formData, updateFormData] = useState(initialFormData);
  const [loginformData, updateLoginFormData] = useState(initialFormData);


  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
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
                    <Input id="login-email" type="email" placeholder="Enter your email" onChange={handleLoginChange} name='email' required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" type="password" placeholder="Enter your password" name='password' onChange={handleLoginChange} required />
                  </div>
                </div>
              </form>
            </TabsContent>




            <TabsContent value="register">
              <form onSubmit={handleRegisterSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="register-name">Name</Label>
                    <Input id="register-name" type="text" placeholder="Enter your name" required name='name' onChange={handleChange} />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" type="email" placeholder="Enter your email" required name='email' onChange={handleChange} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="register-password">Password</Label>
                    <Input id="register-password" type="password" placeholder="Create a password" required name='password' onChange={handleChange} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Select onValueChange={(e) => updateFormData({ ...formData, country: e })}>
                      <Label>Country</Label>
                      <SelectTrigger name='country' className="w-full">
                        <SelectValue placeholder="Select your Country" />
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
          <Link to={'/auth/v1/seller/login'}><p >Are you a seller ? Login here</p> </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
