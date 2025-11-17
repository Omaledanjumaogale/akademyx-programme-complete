import { v } from "convex/values";

export const applicationSchema = v.object({
  firstName: v.string(),
  lastName: v.string(),
  email: v.string(),
  phone: v.string(),
  age: v.number(),
  occupation: v.string(),
  location: v.string(),
  ninNumber: v.string(),
  stateOfResident: v.string(),
  stateOfOrigin: v.string(),
  motivation: v.string(),
  experience: v.string(),
  goals: v.string(),
  status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected"), v.literal("paid")),
  referralCode: v.optional(v.string()),
  referralType: v.optional(v.union(v.literal("institution"), v.literal("individual"), v.literal("direct"))),
  partnerId: v.optional(v.id("referralPartners")),
  amount: v.number(),
  paymentStatus: v.union(v.literal("pending"), v.literal("completed")),
  createdAt: v.number(),
  updatedAt: v.number(),
});

export const paymentSchema = v.object({
  applicationId: v.id("applications"),
  amount: v.number(),
  currency: v.string(),
  status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
  paymentMethod: v.string(),
  transactionId: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
});

export const userSchema = v.object({
  email: v.string(),
  firstName: v.string(),
  lastName: v.string(),
  phone: v.string(),
  role: v.union(v.literal("user"), v.literal("admin")),
  isActive: v.boolean(),
  createdAt: v.number(),
  updatedAt: v.number(),
});

export const courseSchema = v.object({
  title: v.string(),
  description: v.string(),
  duration: v.string(),
  price: v.number(),
  modules: v.array(v.string()),
  isActive: v.boolean(),
  createdAt: v.number(),
  updatedAt: v.number(),
});

export const referralPartnerSchema = v.object({
  name: v.string(),
  type: v.union(v.literal("institution"), v.literal("individual")),
  email: v.string(),
  phone: v.string(),
  ninNumber: v.string(),
  stateOfResident: v.string(),
  stateOfOrigin: v.string(),
  referralCode: v.string(),
  institutionName: v.optional(v.string()),
  studentUnionPresident: v.optional(v.object({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
  })),
  bankingDetails: v.object({
    bankName: v.string(),
    accountNumber: v.string(),
    accountName: v.string(),
  }),
  totalReferrals: v.number(),
  confirmedReferrals: v.number(),
  totalCommission: v.number(),
  paidCommission: v.number(),
  pendingCommission: v.number(),
  status: v.union(v.literal("active"), v.literal("inactive")),
  isApproved: v.boolean(),
  createdAt: v.number(),
  updatedAt: v.number(),
});

export const commissionSchema = v.object({
  partnerId: v.id("referralPartners"),
  applicationId: v.id("applications"),
  amount: v.number(),
  status: v.union(v.literal("pending"), v.literal("paid")),
  referralCode: v.string(),
  createdAt: v.number(),
  paidAt: v.optional(v.number()),
});

export const disbursementSchema = v.object({
  partnerId: v.id("referralPartners"),
  amount: v.number(),
  status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
  bankReference: v.string(),
  createdAt: v.number(),
  completedAt: v.optional(v.number()),
});

export const authUserSchema = v.object({
  workosUserId: v.string(),
  email: v.string(),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  role: v.union(v.literal("user"), v.literal("admin")),
  isActive: v.boolean(),
  lastLoginAt: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),
});