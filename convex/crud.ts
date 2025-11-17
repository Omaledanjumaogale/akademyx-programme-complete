import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Application mutations
export const createApplication = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const applicationId = await ctx.db.insert("applications", {
      ...args,
      status: "pending",
      referralCode: null,
      referralType: "direct",
      partnerId: null,
      amount: 3000,
      paymentStatus: "pending",
      createdAt: now,
      updatedAt: now,
    });
    return applicationId;
  },
});

export const updateApplicationStatus = mutation({
  args: {
    applicationId: v.id("applications"),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.applicationId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

// Application queries
export const getApplications = query({
  handler: async (ctx) => {
    return await ctx.db.query("applications").collect();
  },
});

export const getApplicationById = query({
  args: { applicationId: v.id("applications") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.applicationId);
  },
});

export const getApplicationsByStatus = query({
  args: { status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")) },
  handler: async (ctx, args) => {
    return await ctx.db.query("applications")
      .filter((q) => q.eq(q.field("status"), args.status))
      .collect();
  },
});

// Payment mutations
export const createPayment = mutation({
  args: {
    applicationId: v.id("applications"),
    amount: v.number(),
    currency: v.string(),
    paymentMethod: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const paymentId = await ctx.db.insert("payments", {
      ...args,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
    return paymentId;
  },
});

export const updatePaymentStatus = mutation({
  args: {
    paymentId: v.id("payments"),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
    transactionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.paymentId, {
      status: args.status,
      transactionId: args.transactionId,
      updatedAt: Date.now(),
    });
  },
});

// User management
export const createUser = mutation({
  args: {
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const userId = await ctx.db.insert("users", {
      ...args,
      role: "user",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
    return userId;
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return users[0] || null;
  },
});

// Course management
export const getCourses = query({
  handler: async (ctx) => {
    return await ctx.db.query("courses")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

export const createCourse = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    duration: v.string(),
    price: v.number(),
    modules: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const courseId = await ctx.db.insert("courses", {
      ...args,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
    return courseId;
  },
});

// Referral Partner Management
export const createReferralPartner = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const partnerId = await ctx.db.insert("referralPartners", {
      ...args,
      totalReferrals: 0,
      confirmedReferrals: 0,
      totalCommission: 0,
      paidCommission: 0,
      pendingCommission: 0,
      status: "active",
      isApproved: false,
      createdAt: now,
      updatedAt: now,
    });
    return partnerId;
  },
});

export const getReferralPartnerByCode = query({
  args: { referralCode: v.string() },
  handler: async (ctx, args) => {
    const partners = await ctx.db.query("referralPartners")
      .filter((q) => q.eq(q.field("referralCode"), args.referralCode))
      .collect();
    return partners[0] || null;
  },
});

export const getReferralPartnerById = query({
  args: { partnerId: v.id("referralPartners") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.partnerId);
  },
});

export const getReferralPartners = query({
  handler: async (ctx) => {
    return await ctx.db.query("referralPartners").collect();
  },
});

export const updateReferralPartnerStatus = mutation({
  args: {
    partnerId: v.id("referralPartners"),
    status: v.union(v.literal("active"), v.literal("inactive")),
    isApproved: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.partnerId, {
      status: args.status,
      isApproved: args.isApproved,
      updatedAt: Date.now(),
    });
  },
});

// Commission Management
export const createCommission = mutation({
  args: {
    partnerId: v.id("referralPartners"),
    applicationId: v.id("applications"),
    amount: v.number(),
    referralCode: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const commissionId = await ctx.db.insert("commissions", {
      ...args,
      status: "pending",
      createdAt: now,
    });
    
    // Update partner commission totals
    const partner = await ctx.db.get(args.partnerId);
    if (partner) {
      await ctx.db.patch(args.partnerId, {
        totalCommission: partner.totalCommission + args.amount,
        pendingCommission: partner.pendingCommission + args.amount,
        updatedAt: now,
      });
    }
    
    return commissionId;
  },
});

export const getCommissionsByPartner = query({
  args: { partnerId: v.id("referralPartners") },
  handler: async (ctx, args) => {
    return await ctx.db.query("commissions")
      .filter((q) => q.eq(q.field("partnerId"), args.partnerId))
      .collect();
  },
});

export const getPendingCommissions = query({
  handler: async (ctx) => {
    return await ctx.db.query("commissions")
      .filter((q) => q.eq(q.field("status"), "pending"))
      .collect();
  },
});

// Disbursement Management
export const createDisbursement = mutation({
  args: {
    partnerId: v.id("referralPartners"),
    amount: v.number(),
    bankReference: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const disbursementId = await ctx.db.insert("disbursements", {
      ...args,
      status: "pending",
      createdAt: now,
    });
    
    // Update partner paid commission
    const partner = await ctx.db.get(args.partnerId);
    if (partner) {
      await ctx.db.patch(args.partnerId, {
        paidCommission: partner.paidCommission + args.amount,
        pendingCommission: partner.pendingCommission - args.amount,
        updatedAt: now,
      });
    }
    
    return disbursementId;
  },
});

export const updateDisbursementStatus = mutation({
  args: {
    disbursementId: v.id("disbursements"),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.disbursementId, {
      status: args.status,
      completedAt: args.status === "completed" ? Date.now() : undefined,
    });
  },
});

// Analytics Functions
export const getDashboardAnalytics = query({
  handler: async (ctx) => {
    const applications = await ctx.db.query("applications").collect();
    const partners = await ctx.db.query("referralPartners").collect();
    const commissions = await ctx.db.query("commissions").collect();
    
    const totalApplications = applications.length;
    const pendingApplications = applications.filter(app => app.status === "pending").length;
    const approvedApplications = applications.filter(app => app.status === "approved" || app.status === "paid").length;
    const totalRevenue = applications.filter(app => app.status === "paid").reduce((sum, app) => sum + app.amount, 0);
    
    const totalCommissions = commissions.reduce((sum, comm) => sum + comm.amount, 0);
    const paidCommissions = commissions.filter(comm => comm.status === "paid").reduce((sum, comm) => sum + comm.amount, 0);
    const pendingCommissions = totalCommissions - paidCommissions;
    
    const totalReferralPartners = partners.length;
    const activeReferralPartners = partners.filter(p => p.status === "active").length;
    const conversionRate = totalApplications > 0 ? (approvedApplications / totalApplications) * 100 : 0;
    
    return {
      totalApplications,
      pendingApplications,
      approvedApplications,
      totalRevenue,
      totalCommissions,
      paidCommissions,
      pendingCommissions,
      totalReferralPartners,
      activeReferralPartners,
      conversionRate: Math.round(conversionRate * 10) / 10,
    };
  },
});

export const getPartnerAnalytics = query({
  args: { partnerId: v.id("referralPartners") },
  handler: async (ctx, args) => {
    const partner = await ctx.db.get(args.partnerId);
    if (!partner) return null;
    
    const applications = await ctx.db.query("applications")
      .filter((q) => q.eq(q.field("referralCode"), partner.referralCode))
      .collect();
    
    const commissions = await ctx.db.query("commissions")
      .filter((q) => q.eq(q.field("partnerId"), args.partnerId))
      .collect();
    
    const totalReferrals = applications.length;
    const confirmedReferrals = applications.filter(app => app.status === "paid").length;
    const conversionRate = totalReferrals > 0 ? (confirmedReferrals / totalReferrals) * 100 : 0;
    
    return {
      totalReferrals,
      confirmedReferrals,
      totalCommission: partner.totalCommission,
      paidCommission: partner.paidCommission,
      pendingCommission: partner.pendingCommission,
      conversionRate: Math.round(conversionRate * 10) / 10,
    };
  },
});