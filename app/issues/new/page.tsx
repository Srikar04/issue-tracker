import React from 'react'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from '../_components/IssueFormSkeleton'

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)

const NewIssue = () => {
  return (
    <div>
      <IssueForm />
    </div>
  )
}

export default NewIssue
