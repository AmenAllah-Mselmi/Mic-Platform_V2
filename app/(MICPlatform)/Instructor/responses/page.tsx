'use client'
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import { useResponseStore } from '@/app/store/MyStore/ResponseStore'
import { ResponseForInstructor } from '@/app/store/Models/Response'
import EmailModal from '../../_MICcomponents/Instructor_UI/EmailModal'
import PendingIcon from '@mui/icons-material/HourglassEmpty'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { useSearchParams } from 'next/navigation'

const Page: React.FC = () => {
  const [assignmentId, setAssignmentId] = useState<string | null>(null)
  const { responses, fetchResponses } = useResponseStore()
  const [expanded, setExpanded] = useState<string | false>(false)
  const [open, setOpen] = useState(false)
  const [selectedResponse, setSelectedResponse] =
    useState<ResponseForInstructor | null>(null)

  const handleOpen = (response: ResponseForInstructor) => {
    setSelectedResponse(response)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)
  const handleSendEmail = formData => {
    console.log('Sending email with data:', formData)
    // Appelle l'API pour envoyer l'email avec les données de formData
  }
  const searchParams = useSearchParams()
  const selectedId = searchParams.get('assignmentId')

  useEffect(() => {
    const fetchData = async () => {
      console.log(selectedId)
      console.log('assignmentId')
      try {
        if (selectedId) {
          await fetchResponses(selectedId)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des réponses', error)
      }
    }
    // Appelle fetchData uniquement si `assignmentId` est défini
    if (selectedId) {
      setAssignmentId(selectedId)
      fetchData()
    }
  }, [selectedId, fetchResponses])

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  if (!responses || responses.length === 0) {
    return (
      <Typography variant='h6'>
        Aucune réponse disponible pour le moment.
      </Typography>
    )
  }

  // Filtrer les réponses par statut
  const awaitingForReviewResponses = responses.filter(
    response => response.status === 'AWAITING FOR REVIEW'
  )
  const reviewedResponses = responses.filter(
    response => response.status === 'REVIEWED'
  )
  const editedResponses = responses.filter(
    response => response.status === 'EDITED'
  )
  const approvedResponses = responses.filter(
    response => response.status === 'APPROVED'
  )

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
            variant='h6'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px'
            }}
          >
            <PendingIcon />
            Awaiting for Review
          </Typography>
          {awaitingForReviewResponses.length > 0 ? (
            awaitingForReviewResponses.map((response, index) => (
              <Accordion
                key={response._id}
                expanded={expanded === `panel${response._id}`}
                onChange={handleChange(`panel${response._id}`)}
              >
                <AccordionSummary
                  aria-controls={`panel${response._id}-content`}
                  id={`panel${response._id}-header`}
                >
                  <Typography>{response.Member.NomPrenom}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <strong>Content:</strong> {response.Content}
                    <br />
                    <strong>Created At:</strong>{' '}
                    {new Date(response.createdAt).toLocaleString()}
                    <br />
                    <Box display='flex' justifyContent='center' mt={2}>
                      <Button
                        className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
                        variant='contained'
                        onClick={() => handleOpen(response)}
                      >
                        Send comment
                      </Button>
                    </Box>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography>No responses awaiting for review</Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography
            className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
            variant='h6'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px'
            }}
          >
            <MarkEmailReadIcon />
            Reviewed
          </Typography>

          {reviewedResponses.length > 0 ? (
            reviewedResponses.map((response, index) => (
              <Accordion
                key={response._id}
                expanded={expanded === `panel${response._id}`}
                onChange={handleChange(`panel${response._id}`)}
              >
                <AccordionSummary
                  aria-controls={`panel${response._id}-content`}
                  id={`panel${response._id}-header`}
                >
                  <Typography>{response.Member.NomPrenom}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <strong>Content:</strong> {response.Content}
                    <br />
                    <strong>Created At:</strong>{' '}
                    {new Date(response.createdAt).toLocaleString()}
                    <br />
                    <Box display='flex' justifyContent='center' mt={2}>
                      <Button
                        className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
                        variant='contained'
                        onClick={() => handleOpen(response)}
                      >
                        Send comment
                      </Button>
                    </Box>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography>No Reviewed responses</Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography
            className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
            variant='h6'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px'
            }}
          >
            <BorderColorIcon />
            Edited
          </Typography>
          {editedResponses.length > 0 ? (
            editedResponses.map((response, index) => (
              <Accordion
                key={response._id}
                expanded={expanded === `panel${response._id}`}
                onChange={handleChange(`panel${response._id}`)}
              >
                <AccordionSummary
                  aria-controls={`panel${response._id}-content`}
                  id={`panel${response._id}-header`}
                >
                  <Typography>{response.Member.NomPrenom}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <strong>Content:</strong> {response.Content}
                    <br />
                    <strong>Created At:</strong>{' '}
                    {new Date(response.createdAt).toLocaleString()}
                    <br />
                    <Box display='flex' justifyContent='center' mt={2}>
                      <Button
                        className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
                        variant='contained'
                        onClick={() => handleOpen(response)}
                      >
                        Send comment
                      </Button>
                    </Box>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography>No edited responses</Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography
            className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
            variant='h6'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px'
            }}
          >
            <DoneAllIcon />
            Approved
          </Typography>
          {approvedResponses.length > 0 ? (
            approvedResponses.map((response, index) => (
              <Accordion
                key={response._id}
                expanded={expanded === `panel${response._id}`}
                onChange={handleChange(`panel${response._id}`)}
              >
                <AccordionSummary
                  aria-controls={`panel${response._id}-content`}
                  id={`panel${response._id}-header`}
                >
                  <Typography>{response.Member.NomPrenom}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <strong>Content:</strong> {response.Content}
                    <br />
                    <strong>Created At:</strong>{' '}
                    {new Date(response.createdAt).toLocaleString()}
                    <br />
                    <Box display='flex' justifyContent='center' mt={2}>
                      <Button
                        className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
                        variant='contained'
                        onClick={() => handleOpen(response)}
                      >
                        Send comment
                      </Button>
                    </Box>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography>No Approved responses</Typography>
          )}
        </Grid>
      </Grid>

      <EmailModal
        emailMember={selectedResponse?.Member?.Email || null}
        open={open}
        handleClose={handleClose}
        handleSendEmail={handleSendEmail}
      />
    </Box>
  )
}

export default Page
