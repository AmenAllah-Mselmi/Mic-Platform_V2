'use client'
import * as React from 'react'
import {
  Grid,
  Button,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import EnhancedTable from '../../_MICcomponents/Admin_UI/TableComponent/TableComponent'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import PaginationComponent from '../../_MICcomponents/PaginationComponent/PaginationComponent'
import { useSessionsStore } from '@/app/store/MyStore/SessionsStore'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SessionCard from '../../_MICcomponents/Instructor_UI/SessionCard/SessionCard'
import { Session } from '@/app/store/Models/Session'
import SessionForm from '../../_MICcomponents/sessionForm/SessionForm'
import { useAuthStore } from '@/app/store/MyStore/AuthStore'

const Page: React.FC = () => {
  const sessions = useSessionsStore(state => state.sessions)
  const fetchSessions = useSessionsStore(state => state.fetchSessions)
  const user = useAuthStore(state => state.user)
  const deleteSession = useSessionsStore(state => state.deleteSession)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [editingSession, setEditingSession] = useState<Session | null>(null)
  const [openDialog, setOpenDialog] = useState(false) // État pour le modal

  useEffect(() => {
    const loadSessions = async () => {
      await fetchSessions(user.DepartmentId)
      console.log('Sessions fetched:', sessions)
    }

    loadSessions()
  }, [fetchSessions])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSessions = sessions
    ? sessions.slice(indexOfFirstItem, indexOfLastItem)
    : []

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }

  const handleEditSession = (id: string | number) => {
    const session = sessions.find(session => session._id === id)
    if (session) {
      setEditingSession(session)
      setOpenDialog(true)
    }
  }

  const handleCloseDialog = () => {
    setEditingSession(null)
    setOpenDialog(false)
  }

  const handleDeleteSession = async (id: string) => {
    try {
      await deleteSession(id)
      toast.success('Session supprimée avec succès', {
        position: 'bottom-center'
      })
    } catch (error) {
      toast.error('Erreur lors de la suppression de la session', {
        position: 'bottom-center'
      })
    }
  }

  const headCells = [
    { id: 'Title', numeric: false, disablePadding: true, label: 'Titre' },
    {
      id: 'Description',
      numeric: false,
      disablePadding: true,
      label: 'Description'
    },
    {
      id: 'Instructor',
      numeric: false,
      disablePadding: false,
      label: 'Instructor'
    },
    { id: 'Date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'Room', numeric: false, disablePadding: false, label: 'Room' }
  ]

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      {isMobile ? (
        <Box className='container mx-auto mt-20 flex flex-col items-center justify-around'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 1,
              marginLeft: 1,
              marginRight: 1
            }}
          >
            <Button variant='contained'>filter 1</Button>
            <Button variant='contained'>filter 2</Button>
            <Button variant='contained' startIcon={<AddCircleOutlineIcon />}>
              Add new Session
            </Button>
          </Box>

          {currentSessions && currentSessions.length > 0 ? (
            currentSessions.map(session => (
              <SessionCard
                key={session._id}
                session={session}
                onDelete={() => handleDeleteSession(session._id)}
                onEdit={() => handleEditSession(session._id)}
              />
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

          {/* Modal pour modifier une session */}
          {/* TODO:  BY GHASSEN*/}

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Edit Session</DialogTitle>
            <DialogContent>
              <SessionForm
                editingSession={editingSession}
                setEditingSession={setEditingSession}
                onClose={handleCloseDialog} // Fermer le modal après modification
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color='primary'>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ margin: 4, padding: 0 }}>
          <Grid item xs={12} md={8} sx={{ margin: 0, padding: 0 }}>
            <EnhancedTable
              data={sessions}
              headCells={headCells}
              title='List of Sessions'
              onDelete={handleDeleteSession}
              renderRowActions={row => (
                <Button
                  variant='outlined'
                  onClick={() => handleEditSession(row._id)}
                >
                  Edit
                </Button>
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ marginTop: { xs: 0, md: 0 }, padding: 0 }}
          >
            <SessionForm
              editingSession={editingSession}
              setEditingSession={setEditingSession}
              onClose={handleCloseDialog}
            />
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Page
