import { z } from "zod";

export const CreateIssueSchema = z.object({
  title: z.string().min(1, "Title should not be empty.").max(255, "Title should not be more than 255 characters"),
  description: z.string().min(1, "Description should not be empty."),
});
