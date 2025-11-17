import { NextRequest, NextResponse } from 'next/server'
import { api } from "@/convex/_generated/api"
import { fetchMutation } from "convex/nextjs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { applicationId, amount, currency, paymentMethod } = body

    if (!applicationId || !amount || !currency || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required payment information" },
        { status: 400 }
      )
    }

    // Create payment record in Convex
    const paymentId = await fetchMutation(api.crud.createPayment, {
      applicationId,
      amount: parseFloat(amount),
      currency,
      paymentMethod,
    })

    // Here you would integrate with a payment provider like Paystack, Flutterwave, or Stripe
    // For now, we'll simulate a successful payment
    
    // Update payment status to completed
    await fetchMutation(api.crud.updatePaymentStatus, {
      paymentId,
      status: "completed",
      transactionId: `SIM_${Date.now()}`,
    })

    // Update application status to approved
    await fetchMutation(api.crud.updateApplicationStatus, {
      applicationId,
      status: "approved",
    })

    return NextResponse.json(
      { 
        success: true, 
        paymentId,
        message: "Payment processed successfully" 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    )
  }
}