import React from 'react'
import List from './components/List'
import Chat from './components/Chat'
import Detail from './components/Detail'

const App = () => {
  return (
    <div className='flex h-[90vh] w-[90vw] bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] rounded-[12px]'>
      <List/>
      <Chat/>
      <Detail/>
     
    </div>
  )
}

export default App
