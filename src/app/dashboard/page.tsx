import UserTable from '@/components/table/UserTable'
import React from 'react'

const page = () => {
  return (
    <main className='w-[100%] h-[100%]'>
      <div className='py-8 font-bold text-[]50px leading-[1.1] sm:text-2xl md:text-3xl text-[#ff00008a] text-center'>
        <h2 >This is dashboard page</h2>
      </div>
      <UserTable />
      
    </main>
    
  )
}

export default page
