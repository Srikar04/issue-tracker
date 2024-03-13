import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

const EditIssue = async ({ params }: { params: { id: string } }) => {
  
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })

  if (!issue) {
    notFound()
  }
  
  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  )
}

export default EditIssue
