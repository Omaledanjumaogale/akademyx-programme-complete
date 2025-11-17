"use client"

import { motion } from "framer-motion"

// Re-export motion components for client-side only usage
export { motion }

// Create a simple wrapper that ensures client-side rendering
export const ClientMotionDiv = motion.div