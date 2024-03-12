import { Skeleton } from '@/app/components';
import { Box, Text } from '@radix-ui/themes';

const newIssueLoadingPage = () => {
  return (
    <Box>
      <Text>Loaidn</Text>
      <form className="space-y-4 max-w-xl">
        <Skeleton />
        <Skeleton height="20rem" />
      </form>
    </Box>
  )
}

export default newIssueLoadingPage
