import React, { useEffect, useState } from 'react'
import AddUser from './AddUser'
import { useUserStore } from '../lib/userStore'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'

const ChatList = () => {

    const [addMode, setAddMode] = useState(false)
    const [chats, setChats] = useState([])
    const {currentUser} = useUserStore()

    useEffect(()=>{
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res)=>{
           const items = res.data().chat

           const promises = items.map(async(item)=>{
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);

            const user = userDocSnap.data()

            return {...item, user}
           })

           const chatData = await Promise.all(promises)

           setChats(chatData.sort((a,b)=>b.updatedAt - a.updatedAt))
        })

        return ()=>{
            unSub()
        }
    },[currentUser.id])
    console.log(chats)
  return (
    <div >
      <div className='flex items-center gap-x-5 p-3'>
        <div className=' flex py-2 px-1 items-center gap-2 flex-1 bg-[rgba(17,25,40,0.5)]'>
            <img className=' w-4 h-4' src="./search.png" alt="" />
            <input className=' bg-transparent border-0 outline-none' type="text" placeholder='search' />
        </div>
        <div className='text-white cursor-pointer p-[10px] bg-[rgba(17,25,40,0.5)] rounded-[50%]'>
            <img className=' w-4 h-4' onClick={()=>setAddMode(prev => !prev)} src={ addMode? './minus.png':'./plus.png'}/>
        </div>
      </div>
      <div className=' max-h-[40vh] overflow-y-scroll scrol'>

      {chats.map((chat)=>(
         <div key={chat.chatid} className='item'>
            <img className='emg' src="./avatar.png" alt="" />
            <div>
                <span className=' font-medium'>jane doe</span>
                <p className=' font-normal text-[10px]'>{chat.lastmessage}</p>
            </div>
         </div>
      ))}
        
      </div>
    { addMode && <AddUser/>}
    </div>
  )
}

export default ChatList
