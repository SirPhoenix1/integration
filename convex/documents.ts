import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { UserIdentity } from "convex/server";

const verifyIdentity = (identity: UserIdentity | null) => {
  if (!identity) {
    throw new Error("Not authenticated.");
  }
  const userId = identity.subject;
  return userId;
};

export const archive = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const userId = verifyIdentity(identity);

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found.");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized.");
    }

    const document = await ctx.db.patch(args.id, { isArchived: true });

    return document;
  },
});

export const getSidebar = query({
  args: {
    parentFolder: v.optional(v.id("folders")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const userId = verifyIdentity(identity);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentFolder", args.parentFolder)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentFolder: v.optional(v.id("folders")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const userId = verifyIdentity(identity);

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentFolder: args.parentFolder,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    const userId = verifyIdentity(identity);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  },
});

export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const userId = verifyIdentity(identity);

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found.");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized.");
    }

    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };

    if (existingDocument.parentFolder) {
      const parent = await ctx.db.get(existingDocument.parentFolder);
      if (parent?.isArchived) {
        options.parentFolder = undefined;
      }
    }

    const document = await ctx.db.patch(args.id, options);

    return document;
  },
});

export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const userId = verifyIdentity(identity);

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found.");
    }

    if (userId !== existingDocument.userId) {
      throw new Error("Unauthorized.");
    }

    const document = await ctx.db.delete(args.id);

    return document;
  },
});

export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.isPublished && !document.isArchived) return document;

    const userId = verifyIdentity(identity);

    if (document.userId !== userId) {
      throw new Error("Unauthorized.");
    }

    return document;
  },
});

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const userId = verifyIdentity(identity);

    const { id, ...rest } = args;

    const existingDocument = await ctx.db.get(id);

    if (!existingDocument) throw new Error("Not found.");

    if (existingDocument.userId !== userId) throw new Error("Unauthorized");

    const document = ctx.db.patch(id, { ...rest });

    return document;
  },
});

export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    const userId = verifyIdentity(identity);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const removeIcon = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const userId = verifyIdentity(identity);

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) throw new Error("Not Found.");
    if (existingDocument.userId !== userId) throw new Error("Unauthorized.");

    const document = await ctx.db.patch(args.id, { icon: undefined });

    return document;
  },
});

export const removeCoverImage = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const userId = verifyIdentity(identity);

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) throw new Error("Not Found.");
    if (existingDocument.userId !== userId) throw new Error("Unauthorized.");

    const document = await ctx.db.patch(args.id, { coverImage: undefined });

    return document;
  },
});

export const getDocuments = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    const userId = verifyIdentity(identity);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});
