import React from 'react'
import Navbar from '../_MICcomponents/navbar/navbar'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: 'url("/images/Member/MemberBackground.png")'
        }}
        className='z--10 flex min-h-screen w-screen flex-col items-center justify-center bg-cover bg-center'
      >
        <Navbar />
        {children}
      </div>
    </>
  )
}

export default Layout
