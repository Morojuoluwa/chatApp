import React, { useEffect } from 'react'
import List from './components/List'
import Chat from './components/Chat'
import Detail from './components/Detail'
import Login from './components/Login'
import Notification from './components/Notification'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'

const App = () => {

  const {isLoading, currentUser, fetchUserInfo} = useUserStore()

  

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
    fetchUserInfo(user?.uid)
   
    })

    return ()=>{
      unSub()
    }
  },[fetchUserInfo])
  console.log(currentUser)
  

  if(isLoading) return <div className='p-4 text-[36px] rounded-[10px] bg-[rgba(17,25,40,0.9)]'>Loading...</div>
  return (
    <div className='flex h-[90vh] w-[90vw] bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] rounded-[12px]'>

      {
        currentUser?(
          <>
          <List/>
          <Chat/>
          <Detail/>
          
          </>
        ):
        (
          <Login/>
        )
      }
     <Notification/>
    </div>
  )
}

export default App
