import React, { useEffect, useState } from 'react'
import AddUser from './AddUser'
import { useUserStore } from '../lib/userStore'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useChatStore } from '../lib/chatStore'

const ChatList = () => {

    const [addMode, setAddMode] = useState(false)
    const [chats, setChats] = useState([])

    const {currentUser} = useUserStore()

    const {chatId,changeChat} = useChatStore()
console.log(chatId)
    useEffect(()=>{
        const unSub = onSnapshot(doc(db, "userschat", currentUser.id), async (reps)=>{
           const items = reps.data().chats
          

           const promises = items.map(async(item) =>{
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

    const handleSelect = async (chat) =>{
      

      const userChats = chats.map((item)=>{
        const {user, ...rest} = item
        return rest})

        const chatIndex = userChats.findIndex((item)=>item.chatId === chat.chatId)
        userChats[chatIndex].isSeen = true

        const userChatRef = doc(db, "userschat", currentUser.id)

        try{
          await updateDoc(userChatRef, {
            chats:userChats
          })
          changeChat(chat.chatId, chat.user)
        }catch{

        }
      
    
    }

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
         <div key={chat.chatId} style={{backgroundColor:chat.isSeen?'transparent':"#5183fe"}} className='item' onClick={()=>handleSelect(chat)}>
            <img className='emg' src={chat.user.avatar||"./avatar.png"} alt="" />
            <div>
                <span className=' font-medium'>{chat.user.username}</span>
                <p className=' font-normal text-[10px]'>{chat.lastMessage}</p>
            </div>
         </div>
      ))}
        
      </div>
    { addMode && <AddUser/>}
    </div>
  )
}

export default ChatList
