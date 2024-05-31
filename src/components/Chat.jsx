import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'

const Chat = () => {
  const [open,setOpen] = useState(false)
  const [chat, setChat] = useState()
  const [text, setText]= useState("")
  const endRef = useRef(null)

  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior:"smooth"})
  },[])

  useEffect(()=>{

    const unSub = onSnapshot(doc(db, "chats", "BtoKJsxFPeQ58x0UomNi"), (res)=>{
      setChat(res.data())
    })

    return ()=>{
      unSub()
    }
  },[])

  console.log(chat)

  const handleEmoji = (e) =>{
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }

 
  return (
    <div className='flex-[2] border-x-[1px] flex flex-col border-x-solid border-x-gray-400 h-full'>
      <div className='p-4 flex items-center justify-between border-b-[1px] border-b-solid border-b-gray-400'>
        <div className='flex items-center gap-4'>
          <img src="./avatar.png" className='w-[60px] h-[60px] rounded-[50%] object-cover' alt="" />
          <div className=' flex flex-col gap-[5px]'>
            <span className=' text-[18px] font-bold'>Jane doe</span>
            <p className=' text-[14px] text-gray-200 font-thin'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, accusamus?</p>
          </div>
        </div>
        <div className='flex gap-3 chat'>
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className=' flex-1 p-4 overflow-y-scroll flex flex-col gap-3 scrol'>
      <div className='message'>
          <img src="./avatar.png" alt="" />
          <div className='text'>
            <p className=' p-5 bg-[rgba(17,25,40,0.3)] rounded-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, pariatur!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message own'>
          {/* <img src="./avatar.png" alt="" /> */}
          <div className='text'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, pariatur!</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className='message '>
          <img src="./avatar.png" alt="" />
          <div className='text'>
            <p className=' p-5 bg-[rgba(17,25,40,0.3)] rounded-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, pariatur!</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className='own message'>
          {/* <img src="./avatar.png" alt="" /> */}
          <div className='text'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, pariatur!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message'>
          <img src="./avatar.png" alt="" />
          <div>
            <p className=' p-5 bg-[rgba(17,25,40,0.3)] rounded-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, pariatur!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}> </div>
      </div>
      
      <div className='p-4 flex items-center mt-auto gap-2 justify-between border-y-[1px] border-solid border-gray-600'>
        <div className=' flex gap-3'>
          <img className='w-4' src="./img.png" alt="" />
          <img className='w-4' src="./camera.png" alt="" />
          <img className='w-4' src="./mic.png" alt="" />
        </div>
        <input className='flex px-2 bg-[rgba(17,25,40,0.5)] py-[2px] flex-1 border-none outline-none text-white'type="text" value={text} placeholder='Type a message...' onChange={(e)=>setText(e.target.value)}/>
        <div className='relative'>
          <img className='w-4' src="./emoji.png" alt="" onClick={()=>setOpen(prev =>!prev)} />
          <div className='absolute bottom-[50px] left-0'>
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className=' bg-[#3a50c0] text-white py-[2px] rounded-[5px] px-2'>Send</button>
      </div>
    </div>
  )
}

export default Chat
