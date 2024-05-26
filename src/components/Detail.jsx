import React from 'react'
import { auth } from '../lib/firebase'

const Detail = () => {
  return (
    <div className=' flex-1 '>
     <div className=' deet py-7 px-4 flex flex-col items-center gap-4 border-b-[1px] border-solid border-gray-500'>
      <img src="./avatar.png" alt="" />
      <h2>Jane mee</h2>
      <p>Lorem ipsum dolor sit amet libero debitis rerum labore ipsum.</p>
     </div>
     <div className='p-4 flex flex-col gap-[10px]'>
      <div>
        <div className='flex items-center justify-between'>
          <span>Chat settings</span>
          <img src="./arrowUp.png" alt="" className=' w-[30px] h-[30px] bg-[rgba(17,25,40,0.3)] p-[10px] rounded-[50%] cursor-pointer'/>
        </div>
      </div>
      <div>
        <div className='flex items-center justify-between'>
          <span>Privacy & help</span>
          <img src="./arrowUp.png" alt="" className=' w-[30px] h-[30px] bg-[rgba(17,25,40,0.3)] p-[10px] rounded-[50%] cursor-pointer'/>
        </div>
      </div>
      <div>
        <div className='flex items-center justify-between mb-2'>
          <span>Shared photos</span>
          <img className=' w-[30px] h-[30px] bg-[rgba(17,25,40,0.3)] p-[10px] rounded-[50%] cursor-pointer' src="./arrowUp.png" alt="" />
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex justify-between'>
            <div className='flex gap-x-2 items-center'>
 
              <img className='w-7 h-7 rounded-[5px] object-cover' src="./vite.svg" alt="" />
              <span className='text-[14px] text-gray-200 font-light'>Photo_3_12</span>
            </div>
            <img className=' w-[30px] h-[30px] bg-[rgba(17,25,40,0.3)] p-[10px] rounded-[50%] cursor-pointer' src="./download.png" alt="" />
          </div>
        </div>
      </div>
      <div>
        <div className='flex items-center justify-between mb-2'>
          <span>Shared files</span>
          <img className='w-[30px] h-[30px] bg-[rgba(17,25,40,0.3)] p-[10px] rounded-[50%] cursor-pointer' src="./arrowUp.png" alt="" />
        </div>
      </div>
      <button className=' cursor-pointer text-[16px] py-[4px] px-[20px] bg-[rgba(230,74,105,0.553)] hover:bg-[rgba(220,20,60,0.796)]'>Block user</button>
      <button onClick={()=>auth.signOut()} className='  cursor-pointer bg-[#1a73e8] py-[4px] px-[20px] text-[16px]'>LogOut</button>
     </div>
    </div>
  )
}

export default Detail
