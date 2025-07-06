"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [email, setemail] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  async function sendRequest() {
    setLoading(true)
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        email,
        password
      })
      const jwt = response.data.jwt
      localStorage.setItem("token", jwt)
      navigate('/blogs')
    } catch (e) {
      console.log("no data found in db")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md bg-white border border-gray-200 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">Welcome Back</CardTitle>
          <CardDescription className="text-gray-500">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-800">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-gray-500"
                value={email}
                onChange={e => setemail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-800">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10 bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-gray-500"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 focus:ring-2"
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </Label>
            </div>
            <button className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors">
              Forgot password?
            </button>
          </div>

          <Button
            onClick={sendRequest}
            className={
              "w-full font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow " +
              (password.length > 5
                ? "bg-gray-800 hover:bg-gray-900 text-white"
                : "bg-gray-400 hover:bg-gray-500 text-white")
            }
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Google
            </Button>
            <Button
              variant="outline"
              className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              GitHub
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link className="text-gray-700 hover:text-gray-900 underline transition-colors" to={"/signup"}>Sign up</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
