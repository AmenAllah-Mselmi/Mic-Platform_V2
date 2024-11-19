'use client'
import React, { useEffect, useState } from 'react'
import AssignmentCard from '../../_MICcomponents/assignment_UI/AssignmentCard'
import { useAssignmentStore } from './../../../store/MyStore/AssignmentsStore'
import { Button, Grid, Typography } from '@mui/material'
import PaginationComponent from '../../_MICcomponents/PaginationComponent/PaginationComponent'
import { useAuthStore } from '@/app/store/MyStore/AuthStore'
import { useRouter, useSearchParams } from 'next/navigation'
const Page = () => {
  const assignments = useAssignmentStore(state => state.assignments)
  const fetchAssignments = useAssignmentStore(state => state.fetchAssignments)
  const searchParams = useSearchParams()
  const id_dep = searchParams.get('id_dep') // Récupérer id_dep depuis les query params
  console.log('id_dep')
  console.log(id_dep)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Nombre d'éléments par page

  useEffect(() => {
    const loadAssignments = async () => {
      await fetchAssignments(id_dep) // ID de département
    }

    loadAssignments()
  }, [fetchAssignments])

  // Calculer les assignments à afficher pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentAssignments = assignments
    ? assignments.slice(indexOfFirstItem, indexOfLastItem)
    : []

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }
  const router = useRouter()

  return (
    <div className='container mx-auto mt-32'>
      <Button
        onClick={() => router.push(`/Member/sessions?id_dep=${id_dep}`)}
        className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
      >
        GO TO SESSIONS 
      </Button>
      <Grid container spacing={2}>
        {currentAssignments.length > 0 ? (
          currentAssignments.map(assignment => (
            <Grid item xs={12} key={assignment._id}>
              <AssignmentCard
                assignment={{
                  _id: assignment._id,
                  Title: assignment.Title,
                  DueDate: assignment.DueDate,
                  description: assignment.Description,
                  Attachments: assignment.Attachments
                }}
              />
            </Grid>
          ))
        ) : (
          <Typography variant='h6' align='center' sx={{ color: '#fff' }}>
            Aucun assignment disponible pour le moment.
          </Typography>
        )}
      </Grid>

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalItems={assignments ? assignments.length : 0}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Page
