import React from 'react'
import List from './components/List'
import Chat from './components/Chat'
import Detail from './components/Detail'
import Login from './components/Login'
import Notification from './components/Notification'

const App = () => {

  const user = true;
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
