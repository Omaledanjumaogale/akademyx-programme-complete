"use client"

import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Phone, Clock, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from '@/components/motion-wrapper'

interface WhatsAppMessage {
  id: string
  sender: 'user' | 'admin'
  message: string
  timestamp: Date
  status: 'sent' | 'delivered' | 'read'
}

interface WhatsAppIntegrationProps {
  phoneNumber?: string
  defaultMessage?: string
  position?: 'bottom-right' | 'bottom-left'
  theme?: 'green' | 'purple' | 'blue'
  businessName?: string
  welcomeMessage?: string
  workingHours?: {
    start: string
    end: string
    timezone: string
  }
}

export default function WhatsAppIntegration({
  phoneNumber = "+2348012345678",
  defaultMessage = "Hello! I'm interested in the Akademyx Masterclass Programme. Can you tell me more?",
  position = "bottom-right",
  theme = "green",
  businessName = "Akademyx Support",
  welcomeMessage = "ðŸ‘‹ Hi there! How can we help you with the Akademyx Masterclass Programme today?",
  workingHours = {
    start: "09:00",
    end: "18:00",
    timezone: "Africa/Lagos"
  }
}: WhatsAppIntegrationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<WhatsAppMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Theme colors
  const themeColors = {
    green: {
      primary: "bg-green-500",
      hover: "hover:bg-green-600",
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
      text: "text-green-500",
      border: "border-green-500",
      light: "bg-green-50"
    },
    purple: {
      primary: "bg-purple-500",
      hover: "hover:bg-purple-600",
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
      text: "text-purple-500",
      border: "border-purple-500",
      light: "bg-purple-50"
    },
    blue: {
      primary: "bg-blue-500",
      hover: "hover:bg-blue-600",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      text: "text-blue-500",
      border: "border-blue-500",
      light: "bg-blue-50"
    }
  }

  const colors = themeColors[theme]

  // Check working hours
  useEffect(() => {
    const checkWorkingHours = () => {
      const now = new Date()
      const currentTime = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
      
      const isWithinHours = currentTime >= workingHours.start && currentTime <= workingHours.end
      setIsOnline(isWithinHours)
      setCurrentTime(now)
    }

    checkWorkingHours()
    const interval = setInterval(checkWorkingHours, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [workingHours])

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg: WhatsAppMessage = {
        id: Date.now().toString(),
        sender: 'admin',
        message: welcomeMessage,
        timestamp: new Date(),
        status: 'read'
      }
      setMessages([welcomeMsg])
    }
  }, [isOpen, messages.length, welcomeMessage])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessage: WhatsAppMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: inputMessage,
      timestamp: new Date(),
      status: 'sent'
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage("")

    // Simulate typing indicator
    setIsTyping(true)

    // Simulate admin response after 1-2 seconds
    setTimeout(() => {
      setIsTyping(false)
      const adminResponses = [
        "Thank you for your message! An Akademyx advisor will respond shortly.",
        "Great question! Let me connect you with our enrollment team.",
        "We'd love to help you get started! What's your preferred learning schedule?",
        "The next cohort starts soon! Would you like to reserve your spot?",
        "Thank you for your interest! Our team will get back to you within 2 hours during working hours."
      ]

      const randomResponse = adminResponses[Math.floor(Math.random() * adminResponses.length)]
      
      const adminMessage: WhatsAppMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'admin',
        message: randomResponse,
        timestamp: new Date(),
        status: 'read'
      }

      setMessages(prev => [...prev, adminMessage])
    }, 1500 + Math.random() * 1000)
  }

  const openWhatsAppExternal = () => {
    const message = encodeURIComponent(defaultMessage)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  }

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.div
        className={`fixed ${positionClasses[position]} z-50`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              onClick={() => setIsOpen(true)}
              className={`${colors.gradient} text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 relative`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-8 h-8" />
              {isOnline && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* WhatsApp Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed ${positionClasses[position]} z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Header */}
            <div className={`${colors.gradient} text-white p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    {isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{businessName}</h3>
                    <p className="text-sm opacity-90">
                      {isOnline ? (
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          Online
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Away
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 h-80">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? `${colors.primary} text-white`
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                      {message.sender === 'user' && (
                        <span className="ml-1">
                          {message.status === 'sent' && 'âœ“'}
                          {message.status === 'delivered' && 'âœ“âœ“'}
                          {message.status === 'read' && <CheckCircle className="w-3 h-3 inline" />}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-green-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className={`${colors.primary} text-white p-2 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Open in WhatsApp Button */}
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <button
                onClick={openWhatsAppExternal}
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors text-sm font-medium"
              >
                <Phone className="w-4 h-4" />
                Open in WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}