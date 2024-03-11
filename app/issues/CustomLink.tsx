import React from 'react';
import RouterLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';
import { FiExternalLink } from "react-icons/fi";



interface Props {
   href: string;
   children: string
}

const CustomLink = ({ href, children }: Props) => {
   return (
      <div >
         <RouterLink href={href} passHref legacyBehavior>
            <div className="flex items-center">
               <RadixLink underline="always">{children}</RadixLink>
               <FiExternalLink />
            </div>
         </RouterLink>
      </div>
   )
}

export default CustomLink
