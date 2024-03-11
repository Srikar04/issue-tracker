import React,{ReactNode, PropsWithChildren } from 'react';
import {Text} from '@radix-ui/themes';

const ErrorMessage = ( {children}: PropsWithChildren) => {
  if(!children)
    return;
  return (
    <Text color="red" as="p">{children}</Text>
  )
}

export default ErrorMessage