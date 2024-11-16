'use client'
import React, { useEffect, useState } from 'react'
import AssignmentCardForInstructor from '../../_MICcomponents/Instructor_UI/AssignmentCardForInstructor/AssignmentCardForInstructor'
import { useAssignmentStore } from './../../../store/MyStore/AssignmentsStore'
import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import PaginationComponent from '../../_MICcomponents/PaginationComponent/PaginationComponent'
import { useAuthStore } from '@/app/store/MyStore/AuthStore'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useRouter } from 'next/navigation'

const Page = () => {
  const assignments = useAssignmentStore(state => state.assignments)
  const fetchAssignments = useAssignmentStore(state => state.fetchAssignments)
  const user = useAuthStore(state => state.user)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Nombre d'éléments par page

  useEffect(() => {
    const loadAssignments = async () => {
      await fetchAssignments(user.DepartmentId) // ID de département
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
    <div className='container mx-auto'>
      <Button
        className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
        variant='contained'
        startIcon={<AddCircleOutlineIcon />}
        onClick={() =>
          router.push(`/Instructor/create?departmentId=${user.DepartmentId}`)
        }
      >
        Add new Assignment
      </Button>
      <Grid container spacing={2}>
        {currentAssignments.length > 0 ? (
          currentAssignments.map(assignment => (
            <Grid item xs={12} key={assignment._id}>
              <AssignmentCardForInstructor
                assignment={assignment}
              ></AssignmentCardForInstructor>
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
