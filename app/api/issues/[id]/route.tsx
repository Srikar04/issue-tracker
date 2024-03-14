import { issueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(
            validation.error.format(),
            { status: 400 }
        );
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if (!issue)
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: {
            id: parseInt(params.id)
        }, data: {
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(req: NextRequest,
    { params }: { params: { id: string } }) {
    
    const _id: number = parseInt(params.id);
    
    const issue = await prisma.issue.findUnique({
        where: {
            id: _id
        }
    });

    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    await prisma.issue.delete({
        where: {
            id: _id
        }
    });

    return NextResponse.json({ message: "Issue deleted" }, { status: 200 });

}