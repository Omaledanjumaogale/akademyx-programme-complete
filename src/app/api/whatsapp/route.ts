import { NextRequest, NextResponse } from 'next/server'

// WhatsApp Business API Configuration
const WHATSAPP_API_URL = 'https://graph.facebook.com/v18.0'
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN
const WHATSAPP_BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID

// Send WhatsApp Message
export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, message, templateName, templateParams } = await request.json()

    if (!phoneNumber || !message) {
      return NextResponse.json(
        { error: 'Phone number and message are required' },
        { status: 400 }
      )
    }

    // For now, we'll simulate the WhatsApp API call
    // In production, you would integrate with WhatsApp Business API
    const response = await sendWhatsAppMessage(phoneNumber, message, templateName, templateParams)

    return NextResponse.json({
      success: true,
      messageId: response.messageId,
      status: 'sent',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('WhatsApp API Error:', error)
    return NextResponse.json(
      { error: 'Failed to send WhatsApp message' },
      { status: 500 }
    )
  }
}

// Handle WhatsApp Webhook
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // WhatsApp webhook verification
    const mode = searchParams.get('hub.mode')
    const token = searchParams.get('hub.verify_token')
    const challenge = searchParams.get('hub.challenge')

    if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_TOKEN) {
      return new NextResponse(challenge, { status: 200 })
    }

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  } catch (error) {
    console.error('WhatsApp Webhook Error:', error)
    return NextResponse.json(
      { error: 'Webhook verification failed' },
      { status: 500 }
    )
  }
}

// Handle incoming WhatsApp messages (webhook)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Process incoming WhatsApp messages
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === 'messages') {
            const message = change.value.messages?.[0]
            if (message) {
              await processIncomingMessage(message)
            }
          }
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })

  } catch (error) {
    console.error('WhatsApp Incoming Message Error:', error)
    return NextResponse.json(
      { error: 'Failed to process incoming message' },
      { status: 500 }
    )
  }
}

// Helper function to send WhatsApp message (simulated for now)
async function sendWhatsAppMessage(
  phoneNumber: string, 
  message: string, 
  templateName?: string,
  templateParams?: string[]
) {
  // This is a simulated response
  // In production, you would make actual API calls to WhatsApp Business API
  
  if (templateName && templateParams) {
    // Send template message
    console.log(`Sending WhatsApp template message to ${phoneNumber}:`, {
      templateName,
      templateParams
    })
  } else {
    // Send regular message
    console.log(`Sending WhatsApp message to ${phoneNumber}:`, message)
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    messageId: `msg_${Date.now()}`,
    status: 'sent',
    timestamp: new Date().toISOString()
  }
}

// Helper function to process incoming messages
async function processIncomingMessage(message: any) {
  console.log('Processing incoming WhatsApp message:', message)
  
  // Here you would implement your business logic
  // For example:
  // - Save message to database
  // - Send auto-reply
  // - Forward to customer service
  // - Process commands
  
  const from = message.from
  const text = message.text?.body
  
  if (text) {
    // Example: Auto-reply for common questions
    if (text.toLowerCase().includes('price') || text.toLowerCase().includes('cost')) {
      await sendWhatsAppMessage(from, "Our Akademyx Masterclass Programme costs â‚¦3,000 for the complete 21-day course with 3 certifications! ðŸŽ“")
    } else if (text.toLowerCase().includes('start') || text.toLowerCase().includes('begin')) {
      await sendWhatsAppMessage(from, "Great! The next cohort starts soon. Would you like me to send you the enrollment details? ðŸ“š")
    } else if (text.toLowerCase().includes('certification') || text.toLowerCase().includes('certificate')) {
      await sendWhatsAppMessage(from, "You'll receive 3 prestigious certifications upon completion: Community Impact Advocacy, Virtual Polyworking & Multipreneurship, and Prompt Engineering! ðŸ†")
    }
  }
}

// WhatsApp Template Messages
export const WhatsAppTemplates = {
  welcome: {
    name: 'akademyx_welcome',
    components: [
      { type: 'header', parameters: [{ type: 'text', text: 'Akademyx Masterclass' }] },
      { type: 'body', parameters: [{ type: 'text', text: 'Welcome to Akademyx!' }] }
    ]
  },
  enrollmentConfirmation: {
    name: 'akademyx_enrollment_confirmation',
    components: [
      { type: 'body', parameters: [{ type: 'text', text: 'Your enrollment is confirmed!' }] },
      { type: 'button', parameters: [{ type: 'text', text: 'Join Now' }] }
    ]
  },
  courseReminder: {
    name: 'akademyx_course_reminder',
    components: [
      { type: 'body', parameters: [{ type: 'text', text: 'Course starts tomorrow!' }] },
      { type: 'footer', parameters: [{ type: 'text', text: 'Akademyx Team' }] }
    ]
  },
  completionCertificate: {
    name: 'akademyx_completion_certificate',
    components: [
      { type: 'header', parameters: [{ type: 'text', text: 'ðŸŽ‰ Congratulations!' }] },
      { type: 'body', parameters: [{ type: 'text', text: 'You have completed the course!' }] },
      { type: 'footer', parameters: [{ type: 'text', text: 'Your certificate is ready!' }] }
    ]
  }
}