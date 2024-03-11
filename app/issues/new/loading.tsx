import { Box, Text } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
