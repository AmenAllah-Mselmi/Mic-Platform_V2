'use client'
import React, { useState, ChangeEvent } from 'react'
import {
  Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import axios from 'axios'

// Type pour chaque ligne du JSON
interface JsonData {
  [key: string]: string | number // Le JSON peut contenir des chaînes de caractères ou des nombres
}

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [jsonData, setJsonData] = useState<JsonData[]>([])

  // Fonction pour gérer la sélection du fichier
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Fonction pour envoyer le fichier à l'API backend
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Veuillez sélectionner un fichier')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await axios.post(
        'http://localhost:4000/api/test/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      setJsonData(response.data) // Stocker les données JSON reçues du backend
    } catch (error) {
      console.error("Erreur lors de l'upload du fichier", error)
      alert("Erreur lors de l'upload du fichier")
    }
  }

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Uploader un fichier XLS et afficher les données JSON
      </Typography>

      <input type='file' accept='.xls,.xlsx' onChange={handleFileChange} />
      <Box mt={2}>
        <Button variant='contained' color='primary' onClick={handleUpload}>
          Upload
        </Button>
      </Box>

      {jsonData.length > 0 && (
        <Box mt={4}>
          <Typography variant='h5' gutterBottom>
            Données JSON :
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(jsonData[0]).map(key => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {jsonData.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, i) => (
                      <TableCell key={i}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  )
}

export default UploadPage
