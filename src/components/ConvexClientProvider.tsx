"use client"
import { ReactNode } from "react"

// Simple wrapper that bypasses Convex for now to get the app running
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}