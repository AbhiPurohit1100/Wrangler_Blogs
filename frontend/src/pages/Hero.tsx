"use client"

import { Button } from "../components/ui/button"

import { Link } from "react-router-dom"
export function BlogHero() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <Link to={"/"}><span className="text-xl font-medium text-black">Medium</span></Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link to={"/signin"}>
          <button className="text-black hover:text-green-400 transition-colors text-sm">Sign In</button>
          </Link>
          <Link to={"/signup"}><button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Sign up</button></Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light text-black mb-8 leading-tight tracking-tight">
            Humans
            <br />
            Stories and Ideas
          </h1>

          <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed font-light">
            A minimal platform for writers and readers to share stories that matter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-normal px-8 py-3 text-base">
              <Link to={"/signin"}>Start Writing
            </Link></Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-black hover:bg-gray-900 hover:text-white font-normal px-8 py-3 text-base bg-transparent"
            >
                <Link to={"/signup"}>Start Reading</Link>
              
            </Button>
          </div>

            </div>
          </div>
        </div>
  )
}
