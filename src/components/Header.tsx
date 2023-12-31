"use client"

import React, { useState } from "react";
import Image  from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai'
import Link from "next/link";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const { status, data } = useSession()
  const handleLoginClick = () => signIn()

  const handleLogoutClick = () => {
    setMenuIsOpen(false);
    signOut();
  }

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen)

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center lg:border-b lg:border-grayLighter">
      <Link href='/'>
        <div className="relative h-[32px] w-[182px]">
          <Image src="/logo.png" alt="Full Stack Week" fill/>
        </div>
      </Link>

      {status === 'unauthenticated' && (
      <button className="text-primary text-sm font-semibold" onClick={handleLoginClick}>Login</button>
      )}

      {status === 'authenticated' && data.user && (
        <div className="flex items-center gap-3 border-grayLighter p-2 px-3 border border-solid rounded-full relative">
          <AiOutlineMenu size={16} className="text-grayPrimary hover:cursor-pointer" onClick={handleMenuClick}/>

          <Image className="rounded-full shadow-md" height={35} width={35} alt={data.user.name!} src={data.user.image!}/>

          {menuIsOpen && (
            <div className=" z-50 absolute top-14 left-0 w-full h-[100px] bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
              
              <Link href={"/my-trips"} onClick={() => setMenuIsOpen(false)}>
                <button className="text-primary text-sm font-semibold pb-2 border-b border-grayLighter border-solid">
                  Minhas viagens
                </button>
              </Link>

              <button className="text-primary text-sm font-semibold pt-2" onClick={handleLogoutClick}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default Header