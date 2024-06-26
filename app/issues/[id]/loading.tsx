import { Box, Flex, Card } from '@radix-ui/themes'
import React from 'react'
import {Skeleton} from '@/app/components';

const IssueLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" my="5">
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default IssueLoadingPage
