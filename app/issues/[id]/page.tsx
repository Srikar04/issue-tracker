import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'
import Markdown from 'react-markdown';
import delay from 'delay';

interface Props{
    params : { id : string},
}


const Issue = async ({params} : Props) => {

    // await delay(3000);

    const issue = await prisma.issue.findUnique({
        where: {
              id: parseInt(params.id)
        }
    });

    if(!issue)
        notFound();

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" my="3">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose" my="5">
                <Markdown>{issue.description}</Markdown>
            </Card>
        </div>
    )
}

export default Issue
