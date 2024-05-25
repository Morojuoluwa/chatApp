import React, { useEffect } from 'react'
import List from './components/List'
import Chat from './components/Chat'
import Detail from './components/Detail'
import Login from './components/Login'
import Notification from './components/Notification'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'

const App = () => {

  const user = false;

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (user)=>{
      console.log(user)
    })

    
  },[])
  return (
    <div className='flex h-[90vh] w-[90vw] bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] rounded-[12px]'>

      {
        user?(
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
