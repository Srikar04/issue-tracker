'use client';

import Link from 'next/link';
import React, { useEffect } from 'react'
import { IoBugSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';


const Navbar = () => {

  const { status, data: session } = useSession();

  let arr = [
    { href: "/", label: "DashBoard" },
    { href: "/issues/list", label: "Issues" }
  ]
  const [isClientRendered, setIsClientRendered] = React.useState(false);

  let pathname: String = usePathname();

  useEffect(() => {
    setIsClientRendered(true);
  }, []);

  useEffect(() => {
    if (isClientRendered) {

    }
  }, [pathname, isClientRendered]);

  return (
    <nav className="border-b mb-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/"><IoBugSharp /></Link>
            <ul className="flex space-x-6">
              {arr.map((obj) =>
                <li
                  className={classNames({
                    'text-zinc-900': pathname === obj.href,
                    'text-zinc-500': pathname !== obj.href,
                    'hover:text-zinc-900 transition-colors': true
                  }
                  )
                  }
                  key={obj.label}>
                  <Link href={obj.href}>{obj.label}</Link>
                </li>
              )}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href="/api/auth/signout">Log Out</Link>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Log In</Link>
            )}
          </Box>
        </Flex>
      </Container >
    </nav>
  )
}

export default Navbar
