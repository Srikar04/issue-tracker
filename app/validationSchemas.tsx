import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Title should not be empty.")
    .max(255, "Title should not be more than 255 characters"),
  description: z.string().min(1, "Description should not be empty."),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title should not be empty.")
    .max(255, "Title should not be more than 255 characters")
    .optional(),
  description: z
    .string()
    .min(1, "Description should not be empty.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});
