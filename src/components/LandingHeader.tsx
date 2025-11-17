"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogIn, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth/AuthProvider"

export default function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isLoading, isAuthenticated, login, logout } = useAuth()

  const handleLogin = (type: 'user' | 'admin') => {
    if (type === 'admin') {
      // For admin, we'll redirect to admin dashboard
      window.location.href = '/dashboard/admin'
    } else {
      // For regular users, use WorkOS AuthKit
      login()
    }
  }

  const handleSignup = () => {
    // Redirect to WorkOS AuthKit signup
    window.location.href = '/auth/signup'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Akademyx</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#courses" className="text-gray-700 hover:text-purple-600 transition-colors">
              Courses
            </Link>
            <Link href="#certifications" className="text-gray-700 hover:text-purple-600 transition-colors">
              Certifications
            </Link>
            <Link href="#referral" className="text-gray-700 hover:text-purple-600 transition-colors">
              Refer & Earn
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Login Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="text-gray-600">Loading...</div>
            ) : isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleLogin('user')}
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button
                  onClick={handleSignup}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                >
                  Sign Up
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleLogin('admin')}
                  className="text-gray-600 hover:text-purple-600"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-purple-100 py-4">
            <nav className="flex flex-col space-y-4 mb-6">
              <Link href="#courses" className="text-gray-700 hover:text-purple-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Courses
              </Link>
              <Link href="#certifications" className="text-gray-700 hover:text-purple-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Certifications
              </Link>
              <Link href="#referral" className="text-gray-700 hover:text-purple-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Refer & Earn
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </nav>
            
            <div className="flex flex-col space-y-3">
              {isLoading ? (
                <div className="text-gray-600 text-center">Loading...</div>
              ) : isAuthenticated ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-center text-gray-700 hover:text-purple-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogin('user')
                      setIsMenuOpen(false)
                    }}
                    className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white w-full"
                  >
                    <User className="w-4 h-4 mr-2" />
                    User Login
                  </Button>
                  <Button
                    onClick={() => {
                      handleSignup()
                      setIsMenuOpen(false)
                    }}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 w-full"
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogin('admin')
                      setIsMenuOpen(false)
                    }}
                    className="text-gray-600 hover:text-purple-600 w-full"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Admin Login
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}