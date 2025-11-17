import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// User authentication schema
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

// Create or update authenticated user
export const createOrUpdateAuthUser = mutation({
  args: {
    workosUserId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Check if user already exists
    const existingUser = await ctx.db
      .query("authUsers")
      .filter((q) => q.eq(q.field("workosUserId"), args.workosUserId))
      .first();
    
    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        lastLoginAt: now,
        updatedAt: now,
      });
      return existingUser._id;
    } else {
      // Create new user
      const userId = await ctx.db.insert("authUsers", {
        workosUserId: args.workosUserId,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        role: args.role || "user",
        isActive: true,
        lastLoginAt: now,
        createdAt: now,
        updatedAt: now,
      });
      return userId;
    }
  },
});

// Get user by WorkOS ID
export const getAuthUserByWorkOSId = query({
  args: { workosUserId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("authUsers")
      .filter((q) => q.eq(q.field("workosUserId"), args.workosUserId))
      .first();
    return user;
  },
});

// Get user by email
export const getAuthUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("authUsers")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    return user;
  },
});

// Update user role
export const updateUserRole = mutation({
  args: {
    userId: v.id("authUsers"),
    role: v.union(v.literal("user"), v.literal("admin")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      role: args.role,
      updatedAt: Date.now(),
    });
  },
});

// Deactivate user
export const deactivateUser = mutation({
  args: {
    userId: v.id("authUsers"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      isActive: false,
      updatedAt: Date.now(),
    });
  },
});