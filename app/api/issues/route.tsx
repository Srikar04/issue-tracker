import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import prisma from "@/prisma/client";


const CreateIssueSchema = z.object({
    title: z.string().min(1,"Title should not be empty.").max(255,"Title should not be more than 255 characters"),
    description: z.string().min(1,"Description should not be empty."),
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = CreateIssueSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
    const newIssue = await prisma.issue.create({
      data: { title: body.title, description: body.description }
    }); 
  
    return NextResponse.json(newIssue, { status: 201 });
}