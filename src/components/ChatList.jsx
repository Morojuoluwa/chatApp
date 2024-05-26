import React, { useEffect, useState } from 'react'
import AddUser from './AddUser'
import { useUserStore } from '../lib/userStore'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'

const ChatList = () => {

    const [addMode, setAddMode] = useState(false)
    const [chats, setChats] = useState([])
    const {currentUser} = useUserStore()

    useEffect(()=>{
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), (doc)=>{
            setChats(doc.data())
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

        <div className='item'>
            <img className='emg' src="./avatar.png" alt="" />
            <div>
                <span className=' font-medium'>jane doe</span>
                <p className=' font-normal text-[10px]'>hello</p>
            </div>
        </div>
        <div className='item'>
            <img className='emg' src="./avatar.png" alt="" />
            <div>
                <span>jane doe</span>
                <p>hello</p>
            </div>
        </div>
        <div className='item'>
            <img className='emg' src="./avatar.png" alt="" />
            <div>
                <span>jane doe</span>
                <p>hello</p>
            </div>
        </div>
        <div className='item'>
            <img className='emg'src="./avatar.png" alt="" />
            <div>
                <span>jane doe</span>
                <p>hello</p>
            </div>
        </div>
      </div>
    { addMode && <AddUser/>}
    </div>
  )
}

export default ChatList
