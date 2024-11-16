'use client'

import React, { useEffect, useState } from 'react'
import { useResponseStore } from '@/app/store/MyStore/ResponseStore'
import type { Response } from '@/app/store/Models/Response' // Assurez-vous que le chemin est correct
import { Box, Typography, TextField, Button } from '@mui/material'

const Page: React.FC = () => {
  const { responses, fetchResponses, addResponse } = useResponseStore()
  const [Content, setContent] = useState('')
  const [User_Id] = useState('6714f40ffb566ccb8360db7c') // Utilisateur statique pour le test
  const [Assignment_Id] = useState('6715aa10d4442689275f5d29') // Assignment statique pour le test

  // Fonction pour simuler la récupération des réponses au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simuler l'appel avec un MemberId statique
        await fetchResponses('6714f40ffb566ccb8360db7c')
      } catch (error) {
        console.error('Erreur lors de la récupération des réponses', error)
      }
    }
    fetchData()
  }, [fetchResponses])

  // Fonction pour gérer l'ajout d'une réponse
  const handleAddResponse = async () => {
    if (Content) {
      try {
        await addResponse(Content, User_Id, Assignment_Id)
        setContent('') // Réinitialiser le champ de saisie après l'ajout
      } catch (error) {
        console.error("Erreur lors de l'ajout de la réponse", error)
      }
    }
  }

  return (
    <Box className='container mx-auto flex flex-col items-center justify-around'>
      <Typography variant='h1'>Test Response Component</Typography>

      <Box>
        <Typography variant='h2'>Responses:</Typography>
        <ul>
          {responses.map((response: Response) => (
            <li key={response._id}>
              <strong>User ID:</strong> {response.User_id} <br />
              <strong>Content:</strong> {response.Content} <br />
              <strong>Created At:</strong> {response.createdAt}
            </li>
          ))}
        </ul>
      </Box>

      <Box>
        <Typography variant='h2'>Add a Response:</Typography>
        <TextField
          value={Content}
          onChange={e => setContent(e.target.value)}
          placeholder='Enter your response'
          variant='outlined'
          fullWidth
          margin='normal'
        />
        <Button variant='contained' onClick={handleAddResponse}>
          Add Response
        </Button>
      </Box>
    </Box>
  )
}

export default Page
