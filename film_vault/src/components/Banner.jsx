import React from 'react'

function Banner() {
  return (
    <div className = 'h-[20vh] md:h-[100vh] bg-cover bg-center flex items-end' style={{backgroundImage:`url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6nm76lDES8d2z9xSYNouJy6sSYfOPCw-WmG0y7S5A2sR6HpE21TI5Ms&s=10)`}}>
      <div className='text-white text-xl text-center w-full bg-blue-900/60 p-4'>Avengers Endgame</div>
    </div>
  )
}

export default Banner
