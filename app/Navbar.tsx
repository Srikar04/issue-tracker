'use client';

import Link from 'next/link';
import React,{useEffect} from 'react'
import { IoBugSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';


const Navbar = () => {
  let arr = [
    {href:"/",label:"DashBoard"},
    {href:"/issues",label:"Issues"}
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
    <nav className="flex space-x-6 px-5 h-14 mb-5 items-center border-b-4">
        <Link href="/"><IoBugSharp /></Link>
        <ul className="flex space-x-6">
            {arr.map((obj)=> 
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
    </nav>
  )
}

export default Navbar
