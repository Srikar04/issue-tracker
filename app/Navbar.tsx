import Link from 'next/link';
import React from 'react'
import { IoBugSharp } from "react-icons/io5";


const Navbar = () => {
  let arr = [
    {href:"/",label:"DashBoard"},
    {href:"/issues",label:"Issues"}
  ]
  return (
    <nav className="flex space-x-6 px-5 h-14 mb-5 items-center border-b-4">
        <Link href="/"><IoBugSharp /></Link>
        <ul className="flex space-x-6">
            {arr.map((obj)=> 
                <li className="text-zinc-500 hover:text-zinc-900" key={obj.label}>
                    <Link href={obj.href}>{obj.label}</Link>
                </li>
            )}
        </ul>
    </nav>
  )
}

export default Navbar
