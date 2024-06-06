import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useChatStore } from '../lib/chatStore'
import { useUserStore } from '../lib/userStore'
import upload from '../lib/upload'

const Chat = () => {
  const [open,setOpen] = useState(false)
  const [chat, setChat] = useState()
  const [text, setText]= useState("")
  const [img,setImg] = useState({
    file:null,
    url:""
  })
  const endRef = useRef(null)
  const {chatId, user} = useChatStore()

  const {currentUser} = useUserStore()

  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior:"smooth"})
  },[])

  useEffect(()=>{

    const unSub = onSnapshot(doc(db, "chats", chatId), (res)=>{
      setChat(res.data())
    })

    return ()=>{
      unSub()
    }
  },[chatId])

  const handleImg = (e) =>{
    if(e.target.files[0]){
      setImg({
        file:e.target.files[0],
        url:URL.createObjectURL(e.target.files[0])
      })
    }
  }

  // console.log(chat)

  const handleEmoji = (e) =>{
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }

  const handleSend = async() =>{
    if(text == "") return;

    let imgUrl = null

    try{

      if(img.file){
        imgUrl = await upload(img.file)
      }
        await updateDoc(doc(db, "chats", chatId),{
          messages:arrayUnion({
            senderId: currentUser.id, 
            text,
            createdAt:new Date(),

            ...(imgUrl && {img:imgUrl})
          })
        })

        const userIDs = [currentUser.id, user.id]

        userIDs.forEach(async (id)=>{

          
          const userChatRef = doc(db,"userschat", id)
          const userChatSnapshot = await getDoc(userChatRef)
          
          if(userChatSnapshot.exists()){
          const userChatData = userChatSnapshot.data()
         

          const chatIndex = userChatData.chats.findIndex(c=> c.chatId === chatId)
          console.log(userChatData)
          
          userChatData.chats[chatIndex].lastMessage = text
          userChatData.chats[chatIndex].isSeen = id === currentUser.id? true :false
          userChatData.chats[chatIndex].updatedAt = Date.now()
          
          await updateDoc(userChatRef,{
            chats:userChatData.chats

            
          })
          
        }
      })
    }catch(err){
      console.log(err)
    }

    setImg({
      file:null,
      url:""
    })

    setText("")
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
        {chat?.messages?.map((message)=>(
          <div key={message?.createdAt} className={message.senderId === currentUser.id? 'message own':'message'}> 
            <div  className='flex flex-1 flex-col w-[50%] gap-2 '>
              {message.img && <img src={message.img} alt="" />}
              <p className=' p-5 bg-[rgba(17,25,40,0.3)] rounded-[10px]'>{message.text}</p>
              <span>1 min ago</span>
          
            </div>
          </div>
        ))}
        {
          img.url && <div>
            <div className=' w-[40%]'>
              <img className=' w-full object-cover' src={img.url} alt="" />
            </div>
          </div>
        }
          <div ref={endRef}> </div>
      </div>
      
      <div className='p-4 flex items-center mt-auto gap-2 justify-between border-y-[1px] border-solid border-gray-600'>
        <div className=' flex gap-3'>
         <label htmlFor="file">
          <img  className='w-4 h-4' src="./img.png" alt="" />
         </label>
          <input type="file" id='file' style={{display:"none"}} onChange={handleImg} />
          <img className='w-4 h-4' src="./camera.png" alt="" />
          <img className='w-4 h-4' src="./mic.png" alt="" />
        </div>
        <input className='flex px-2 bg-[rgba(17,25,40,0.5)] py-[2px] flex-1 border-none outline-none text-white'type="text" value={text} placeholder='Type a message...' onChange={(e)=>setText(e.target.value)}/>
        <div className='relative'>
          <img className='w-4' src="./emoji.png" alt="" onClick={()=>setOpen(prev =>!prev)} />
          <div className='absolute bottom-[50px] left-0'>
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button onClick={handleSend} className=' bg-[#3a50c0] text-white py-[2px] rounded-[5px] px-2'>Send</button>
      </div>
    </div>
  )
}

export default Chat
