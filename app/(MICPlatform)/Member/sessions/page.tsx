'use client'
import React, { useEffect, useState } from 'react'
import EventCard from '../../_MICcomponents/session_card/session_card'
import { useSessionsStore } from '../../../store/MyStore/SessionsStore'

import { Box, Typography } from '@mui/material'
import PaginationComponent from '../../_MICcomponents/PaginationComponent/PaginationComponent'
import { useSearchParams } from 'next/navigation'

const Page = () => {
  const sessions = useSessionsStore(state => state.sessions)
  const fetchSessions = useSessionsStore(state => state.fetchSessions)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5) // Nombre d'éléments par page
  const searchParams = useSearchParams()
  const departmentId = searchParams.get('id_dep') // Récupère l'ID du département

  useEffect(() => {
    const loadSessions = async (departmentId: string) => {
      await fetchSessions(departmentId)
      console.log('Sessions fetched:', sessions)
    }
    if (departmentId) {
      loadSessions(departmentId)
    }
  }, [departmentId, fetchSessions])

  // Calculer les éléments pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSessions = sessions
    ? sessions.slice(indexOfFirstItem, indexOfLastItem)
    : []

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }

  return (
    <Box className='container mx-auto flex flex-col items-center justify-around'>
      {currentSessions && currentSessions.length > 0 ? (
        currentSessions.map((session, index) => (
          <EventCard session={session} key={index} />
        ))
      ) : (
        <Typography variant='body1'>No sessions available</Typography>
      )}

      {/* Utiliser le composant de pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalItems={sessions ? sessions.length : 0}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </Box>
  )
}

export default Page
