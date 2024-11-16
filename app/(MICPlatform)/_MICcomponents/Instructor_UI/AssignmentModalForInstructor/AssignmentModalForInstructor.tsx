import React, { use, useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter
} from '@nextui-org/react'
import Image from 'next/image'
import { Input } from '@nextui-org/react'
import { Send } from 'lucide-react'
import { useResponseStore } from '@/app/store/MyStore/ResponseStore' // Importez votre store ici
import type { Response } from '@/app/store/Models/Response' // Assurez-vous que le chemin est correct
import { useAuthStore } from '@/app/store/MyStore/AuthStore'
import { set } from 'date-fns'
import ResponseSearch from '../../assignment_UI/ResponseSearch'

export default function AssignmentModal({
  isOpen,
  onOpenChange,
  instructor,
  date,
  content,
  resources,
  imageUrl,
  assignmentId,
  placeholder
}) {
  const { responses, fetchResponses, addResponse } = useResponseStore()
  const fetchedResponse = useResponseStore(state => state.fetchedResponse)
  // console.log('fetchedResponse:', fetchedResponse)
  const [responseContent, setResponseContent] = useState('')
  const user = useAuthStore(state => state.user)
  const [User_Id] = useState(user.id)
  const [Assignment_Id] = useState(assignmentId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchResponses(User_Id) // Simulez l'appel avec l'ID d'utilisateur statique
      } catch (error) {
        console.error('Erreur lors de la récupération des réponses', error)
      }
    }
    fetchData()
  }, [fetchResponses, User_Id])

  const handleAddResponse = async () => {
    if (responseContent) {
      try {
        await addResponse(responseContent, User_Id, Assignment_Id)
        setResponseContent('')
      } catch (error) {
        console.error("Erreur lors de l'ajout de la réponse", error)
      }
    }
  }

  return (
    <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col'>
              Assignment Details
            </ModalHeader>
            <ModalBody className='flex w-full flex-col p-4'>
              <div className='flex w-full flex-col items-start justify-start space-y-4 md:space-x-4 md:space-y-0'>
                <div className='mb-4 flex w-full items-start justify-start gap-4 md:mb-0'>
                  <Image
                    src={'/images/Member/MemberBackground.png'}
                    alt='Person'
                    className='m-0 h-12 w-12 self-center rounded-full'
                    width={48}
                    height={48}
                  />
                  <div className='mb-2 flex-1 text-start'>
                    <h5 className='text-start text-lg font-extrabold'>
                      {instructor}
                    </h5>
                    <h6 className='text-sm text-gray-500'>{date}</h6>
                    <p className='mt-2 w-full text-sm text-gray-700 md:text-base'>
                      {content}
                    </p>
                    {/*<Link
                      href={'#'}
                      className='mt-2 inline-block text-primary hover:underline'
                    >
                      Link for some resources: {resources}
                    </Link>*/}
                  </div>
                </div>

                {/* Affichage de la réponse correspondante */}
                <div className='w-full'>
                  <ResponseSearch Assignment_Id={Assignment_Id} />
                </div>

                {!fetchedResponse && (
                  <div className='flex w-full items-center gap-3 px-3'>
                    <Image
                      src={'/images/Member/MemberBackground.png'}
                      alt='Person'
                      className='m-0 h-12 w-12 self-center rounded-full'
                      width={48}
                      height={48}
                    />
                    <Input
                      value={responseContent}
                      onChange={e => setResponseContent(e.target.value)}
                      placeholder={placeholder}
                      className='max-w-3/4 mt-2 rounded-lg border border-solid border-gray-400 md:w-full'
                    />
                    <Button
                      color='primary'
                      variant='light'
                      className='mt-2 px-1 py-3 md:w-auto'
                      onClick={handleAddResponse} // Ajoutez la fonction ici
                    >
                      <Send size={24} />
                    </Button>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter className='flex justify-start'></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
