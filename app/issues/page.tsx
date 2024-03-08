import React from 'react';
import {Button} from '@radix-ui/themes';
import Link from 'next/link';

const Issues = () => {
  return (
    <div>
       <Button><Link href='/issues/new'>Add new Issue</Link></Button>
    </div>
  )
}

export default Issues
