import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import upload from '../lib/upload'



const Login = () => {

  

  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState({
    file:null,
    url:""
  })

  const handleAvatar = e =>{
    if(e.target.files[0]){
        setAvatar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        })
    }
  }

  // const handleLogin = (e) =>{
  //   e.preventDefault()
  //   toast.warn("nawaa")
  // }

  const handleRegister = async(e) =>{
    setLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target)

    const {username, email, password} = Object.fromEntries(formData)

    try{
      const res = await createUserWithEmailAndPassword(auth, email, password)
      // toast.success("e don enter")

      const imgUrl = await upload(avatar.file)

      await setDoc(doc(db, "users", res.user.uid),{
        username,
        email,
        avatar:imgUrl,
        id:res.user.uid,
        blocked:[]
      })

      
      await setDoc(doc(db, "userschat", res.user.uid),{
       chats: [],
      })


      toast.success("accout created!")
    }catch(err){
      console.log(err)
      toast.error('this error')

    }finally{
      setLoading(false)
    }
  }

  const handleLogin = async (e) =>{
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)
    const {email, password} = Object.fromEntries(formData)

    try{
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("signed in successfulyy")
    }catch(err){
      console.log(err)
      toast.error('err')

    }finally{
      setLoading(false)
    }
  }
  return (
    <div className=' w-full h-full flex items-center gap-[80px'>
        <div className=' flex-1 flex flex-col items-center gap-4'>
            <h2>Welcome back!</h2>
            <form onSubmit={handleLogin}  className='flex flex-col items-center justify-center gap-4'>
                <input type="text" className='enput' placeholder='Email..' name='email' />
                <input type="Password" className='enput' placeholder='Password' name='password' />
                <button className=' w-full border-none p-4 bg-[#1f8ef1] text-white rounded-[5px] cursor-pointer font-medium'>Sign In</button>
            </form>
        </div>
        <div className=' w-[2px] h-[80%] bg-gray-400'></div>
        <div className=' flex-1 flex flex-col items-center gap-4'>
            <h2>Create an account</h2>
            <form onSubmit={handleRegister} className='flex flex-col items-center justify-center gap-2' action="">
                <label htmlFor="file" className=' w-full flex items-center justify-between cursor-pointer underline'>
               <img src= {avatar.url || "./avatar.png"} className=' w-[50px] h-[50px] rounded-[10px] object-cover opacity-40' alt="" />    
                Upload an image</label>
                <input className=' hidden' type="file" id='file' onChange={handleAvatar} />
                <input type="text" className='enput' placeholder='Username' name='username' />
                <input type="text" className='enput' placeholder='Email..' name='email' />
                <input type="Password" className='enput' placeholder='Password' name='password' />
                <button disabled={loading} className={` w-full border-none p-4 text-white rounded-[5px] cursor-pointer ${loading? "bg-[#1f8ff161]": "bg-[#1f8ef1]"} font-medium`}>{loading?'loading':'Sign Up'}</button>
            </form>
        </div>
    </div>
  )
}

export default Login