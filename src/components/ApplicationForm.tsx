"use client"

import { useState } from "react"
import { motion } from "@/components/motion-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "18",
    occupation: "",
    location: "",
    ninNumber: "",
    stateOfResident: "",
    stateOfOrigin: "",
    password: "",
    confirmPassword: "",
    motivation: "",
    experience: "",
    goals: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    }
    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Invalid email address"
    }
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits"
    }
    if (!formData.age || parseInt(formData.age) < 16 || parseInt(formData.age) > 65) {
      newErrors.age = "Age must be between 16 and 65"
    }
    if (!formData.occupation || formData.occupation.length < 2) {
      newErrors.occupation = "Occupation is required"
    }
    if (!formData.location || formData.location.length < 2) {
      newErrors.location = "Location is required"
    }
    if (!formData.ninNumber || formData.ninNumber.length < 11) {
      newErrors.ninNumber = "NIN number must be at least 11 digits"
    }
    if (!formData.stateOfResident) {
      newErrors.stateOfResident = "State of resident is required"
    }
    if (!formData.stateOfOrigin) {
      newErrors.stateOfOrigin = "State of origin is required"
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.motivation || formData.motivation.length < 50) {
      newErrors.motivation = "Motivation must be at least 50 characters"
    }
    if (!formData.experience || formData.experience.length < 20) {
      newErrors.experience = "Experience must be at least 20 characters"
    }
    if (!formData.goals || formData.goals.length < 30) {
      newErrors.goals = "Goals must be at least 30 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          // Don't send password and confirmPassword to the backend for security
          password: undefined,
          confirmPassword: undefined,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        const error = await response.json()
        console.error("Application submission failed:", error)
      }
    } catch (error) {
      console.error("Error submitting application:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-green-800">Application Submitted Successfully!</CardTitle>
            <CardDescription className="text-green-700">
              Thank you for your application. We'll review it and get back to you within 24-48 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-green-600 mb-4">
              Check your email for confirmation and next steps.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-100"
            >
              Submit Another Application
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Apply to Akademyx Masterclass
          </CardTitle>
          <CardDescription className="text-lg">
            Take the first step towards transforming your digital future
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  min="16"
                  max="65"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={errors.age ? "border-red-500" : ""}
                />
                {errors.age && (
                  <p className="text-red-500 text-sm">{errors.age}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Current Occupation *</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className={errors.occupation ? "border-red-500" : ""}
                />
                {errors.occupation && (
                  <p className="text-red-500 text-sm">{errors.occupation}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location (City, State) *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                className={errors.location ? "border-red-500" : ""}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ninNumber">National Identification Number (NIN) *</Label>
              <Input
                id="ninNumber"
                value={formData.ninNumber}
                onChange={handleInputChange}
                placeholder="Enter your 11-digit NIN number"
                className={errors.ninNumber ? "border-red-500" : ""}
              />
              {errors.ninNumber && (
                <p className="text-red-500 text-sm">{errors.ninNumber}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="stateOfResident">State of Resident *</Label>
                <Input
                  id="stateOfResident"
                  value={formData.stateOfResident}
                  onChange={handleInputChange}
                  placeholder="Enter your current state of residence"
                  className={errors.stateOfResident ? "border-red-500" : ""}
                />
                {errors.stateOfResident && (
                  <p className="text-red-500 text-sm">{errors.stateOfResident}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stateOfOrigin">State of Origin *</Label>
                <Input
                  id="stateOfOrigin"
                  value={formData.stateOfOrigin}
                  onChange={handleInputChange}
                  placeholder="Enter your state of origin"
                  className={errors.stateOfOrigin ? "border-red-500" : ""}
                />
                {errors.stateOfOrigin && (
                  <p className="text-red-500 text-sm">{errors.stateOfOrigin}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a secure password"
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to join this programme? *</Label>
              <Textarea
                id="motivation"
                rows={4}
                value={formData.motivation}
                onChange={handleInputChange}
                className={errors.motivation ? "border-red-500" : ""}
                placeholder="Tell us what motivates you to join this programme and how it aligns with your goals..."
              />
              {errors.motivation && (
                <p className="text-red-500 text-sm">{errors.motivation}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Describe your experience with digital tools or online business *</Label>
              <Textarea
                id="experience"
                rows={3}
                value={formData.experience}
                onChange={handleInputChange}
                className={errors.experience ? "border-red-500" : ""}
                placeholder="Share any experience you have with digital tools, online business, or technology..."
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">{errors.experience}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">What are your goals after completing this programme? *</Label>
              <Textarea
                id="goals"
                rows={3}
                value={formData.goals}
                onChange={handleInputChange}
                className={errors.goals ? "border-red-500" : ""}
                placeholder="Describe what you hope to achieve after completing this programme..."
              />
              {errors.goals && (
                <p className="text-red-500 text-sm">{errors.goals}</p>
              )}
            </div>

            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}