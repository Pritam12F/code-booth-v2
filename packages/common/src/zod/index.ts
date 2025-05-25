import { z } from "zod";

// Enum for RatingType
export const RatingTypeEnum = z.enum([
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
  "NINE",
  "TEN",
]);

// User
export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Booth
export const BoothSchema = z.object({
  id: z.number(),
  interviewerId: z.string(),
  intervieweeId: z.string(),
  title: z.string(),
  passed: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Task
export const TaskSchema = z.object({
  id: z.number(),
  name: z.string(),
  boothId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Review
export const ReviewSchema = z.object({
  id: z.number(),
  content: z.string().optional().nullable(),
  boothId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Rating
export const RatingSchema = z.object({
  id: z.number(),
  content: RatingTypeEnum,
  boothId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "Password must be at least 8 characters long"),
});
