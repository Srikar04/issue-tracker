'use client';

import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { IoBugSharp } from "react-icons/io5";
import Skeleton from '@/app/components/Skeleton';


const Navbar = () => {
  return (
    <nav className="border-b mb-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/"><IoBugSharp /></Link>
            <NavbarLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container >
    </nav>
  )
}

const NavbarLinks = () => {
  let arr = [
    { href: "/", label: "DashBoard" },
    { href: "/issues/list", label: "Issues" }
  ]
  let pathname: String = usePathname();
  return (
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
  );
}

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width="3rem" />

  if (status === "unauthenticated") {
    return (
      <Button variant='soft' >
        <Link href="/api/auth/signin">Log In</Link>
      </Button >
    )
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session?.user!.image!}
            fallback="?"
            radius='full'
            size='2'
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">
              {session?.user!.email!}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            {status === "authenticated" && (
              <Link href="/api/auth/signout">Log Out</Link>
            )}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default Navbar
