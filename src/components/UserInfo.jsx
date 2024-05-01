

const UserInfo = () => {
  return (
    <div className='p-[16px] flex items-center justify-between'>
      <div className='flex items-center gap-x-3'>
        <img className=' w-[50px] h-[50px] rounded-[50%] object-cover' src="./avatar.png" alt="" />
        <h2>Moroju</h2>
      </div>
      <div className='flex gap-5 items-center'>
        <img className='w-5 h-5' src="./more.png" alt="" />
        <img className='w-5 h-5' src="./video.png" alt="" />
        <img className='w-5 h-5' src="./edit.png" alt="" />
      </div>
    </div>
  )
}

export default UserInfo
