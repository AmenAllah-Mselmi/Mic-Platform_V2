import React from 'react'
import Logo from '../../../../public/images/big-logo.png'
import Image from 'next/image'

interface Session {
  Room: string
  _id: string
  Title: string
  Description: string
  Instructor: string
  Date: string
  createdAt: string
}

interface EventCardProps {
  session: Session
}

const EventCard: React.FC<EventCardProps> = ({ session }) => {
  return (
    <div className='mx-auto mb-4 mt-4 flex w-3/5 flex-wrap rounded-lg border bg-white px-6 py-6'>
      <div className='mt-0 flex h-full w-full flex-col items-center justify-between py-10 shadow-xl md:mt-24 md:w-1/3 md:justify-center lg:mt-0 lg:w-1/4'>
        <Image
          loading='lazy'
          alt='Logo'
          className='img-fluid rounded-start h-full object-contain'
          src={Logo}
        />
      </div>
      <div className='w-full p-4 md:w-2/3 lg:w-3/4'>
        <div className='card-body'>
          <ul className='list-unstyled'>
            <li className='mb-2'>
              <h6>title : {session.Title}</h6>
            </li>
            <li className='mb-2'>
              <h6> Description : {session.Description}</h6>
            </li>
            <li className='mb-2'>
              <h6>Instructor : {session.Instructor}</h6>
            </li>
            <li className='mb-2'>
              Date : <h6>{session.Date}</h6>
            </li>
            <li className='mb-2'>
              <span>Salle:</span> <h6>{session.Room}</h6>
            </li>
          </ul>
          <p className='card-text text-justify'>
            Description : {session.Description}
          </p>
          <div className='mt-2 flex justify-between'>
            <div>{/* Placeholder for potential additional content */}</div>
            <div className='flex items-center justify-center'>
              <button
                style={{ backgroundColor: '#0B6363' }}
                className='cursor-pointer rounded-md px-4 py-2 text-white'
              >
                Participer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
