import React from 'react'

const Chat = () => {
  return (
    <div className='flex-[2] border-x-[1px] border-x-solid border-x-gray-400 h-full'>
      <div className='p-4 flex items-center justify-between border-b-[1px] border-b-solid border-b-gray-400'>
        <div className='flex items-center gap-4'>
          <img src="./avatar.png" className='w-[60px] h-[60px] rounded-[50%] object-cover' alt="" />
          <div>
            <span>Jane doe</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, accusamus?</p>
          </div>
        </div>
        <div>
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Chat
