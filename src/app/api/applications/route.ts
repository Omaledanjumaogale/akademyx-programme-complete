import { NextRequest, NextResponse } from 'next/server'
import { api } from "@/convex/_generated/api"
import { fetchMutation } from "convex/nextjs"

const applicationSchema = {
  firstName: "string",
  lastName: "string", 
  email: "string",
  phone: "string",
  age: "number",
  occupation: "string",
  location: "string",
  motivation: "string",
  experience: "string",
  goals: "string",
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = Object.keys(applicationSchema)
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create application in Convex
    const applicationId = await fetchMutation(api.crud.createApplication, {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      age: parseInt(body.age),
      occupation: body.occupation,
      location: body.location,
      motivation: body.motivation,
      experience: body.experience,
      goals: body.goals,
    })

    // Send confirmation email (you'll need to implement this)
    // await sendApplicationConfirmation(body.email, body.firstName)

    return NextResponse.json(
      { 
        success: true, 
        applicationId,
        message: "Application submitted successfully" 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Application submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    )
  }
}