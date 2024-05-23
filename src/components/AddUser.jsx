import React from 'react'

const AddUser = () => {
  return (
    <div className=' p-6 bg-[rgba(17,25,40,0.5)] rounded-[10px] absolute top-0 left-0 right-0 bottom-0 m-auto w-max h-max'>
        <form action="" className=' flex gap-4'>
            <input type="text" placeholder='username' name='username' className=' p-4 rounded-[10px] border-none outline-none' />
            <button className=' p-[10px] rounded-[10px] cursor-pointer bg-[#1a73e8] text-white border-none '>search</button>
        </form>
        <div className=' flex mt-[40px] items-center justify-between'>
            <div className=' flex items-center'>
                <img className='w-[40px] h-[40px] object-cover rounded-[50%]' src="./avatar.png" alt="" />
                <span>Jane Doe</span>
            </div>
            <button className=' p-2 rounded-[10px] cursor-pointer bg-[#1a73e8] text-white border-none '>Add user</button>
        </div>
    </div>
  )
}

export default AddUser