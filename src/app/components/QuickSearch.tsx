import Image from 'next/image';
import React from 'react';
import Link from "next/link"

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className=" px-5 font-medium text-grayPrimary whitespace-nowrap">Tente pesquisar por</h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>

      <div className='flex w-full justify-between mt-5 lg:justify-center lg:gap-40 lg:mt-10'>
        <div className="flex flex-col items-center gap-1 hover:cursor-pointer">
          <Link href= "/trips/search?text=hotel">
            <Image src="/Hotel.svg" alt="" width={50} height={50}/>
          </Link>
          <p className="text-sm lg:text-base text-grayPrimary">Hotel</p>
        </div>

        <div className="flex flex-col items-center gap-1 hover:cursor-pointer">
        <Link href= "/trips/search?text=fazenda">
          <Image src="/Farm.svg" alt="" width={50} height={50}/>
        </Link>
          <p className="text-sm lg:text-base text-grayPrimary">Fazenda</p>
        </div>

        <div className="flex flex-col items-center gap-1 hover:cursor-pointer">
        <Link href= "/trips/search?text=chalé">
          <Image src="/Cabin.svg" alt="" width={50} height={50}/>
        </Link>
          <p className="text-sm lg:text-base text-grayPrimary">Chalé</p>
        </div>

        <div className="flex flex-col items-center gap-1 hover:cursor-pointer">
        <Link href= "/trips/search?text=pousada">
          <Image src="/Guest-house.svg" alt="" width={50} height={50}/>
        </Link>
          <p className="text-sm text-grayPrimary">Pousada</p>
        </div>
      </div>
    </div>
  )
}

export default QuickSearch