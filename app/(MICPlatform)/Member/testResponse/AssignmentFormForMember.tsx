import React, { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { Input } from '@/components/ui/input'
import { useAssignmentStore } from '@/app/store/MyStore/AssignmentsStore'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Alert, Snackbar } from '@mui/material'
import ResponseSearch from '../../_MICcomponents/assignment_UI/ResponseSearch'

const formSchema = z.object({
  title: z.string().nonempty('Title is required.'),
  description: z
    .string()
    .min(5, { message: 'The description must be at least 5 characters long.' }),
  date: z.string().nonempty('Date is required.'),
  responses: z.string().optional() // Champ pour les réponses
})

interface AssignmentFormProps {
  assignmentId: string
  initialTitle: string
  initialDescription: string
  initialDate: string
  initialResponses?: string // Nouveau prop pour les réponses
  onSubmitSuccess?: () => void
  editable?: boolean
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({
  assignmentId,
  initialTitle,
  initialDescription,
  initialDate,
  initialResponses = '',
  onSubmitSuccess,
  editable = true
}) => {
  const { updateAssignment } = useAssignmentStore()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialTitle,
      description: initialDescription,
      date: initialDate,
      responses: initialResponses // Initialise le champ responses
    }
  })

  useEffect(() => {
    form.reset({
      title: initialTitle,
      description: initialDescription,
      date: initialDate,
      responses: initialResponses // Réinitialise le champ responses
    })
  }, [initialTitle, initialDescription, initialDate, initialResponses, form])

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const handleUpdate = async (data: any) => {
    const updatedAssignment = {
      Title: data.title,
      Description: data.description,
      DueDate: data.date,
      Responses: data.responses // Inclure les réponses dans la mise à jour
    }

    try {
      await updateAssignment(assignmentId, updatedAssignment)
      setSnackbarMessage('Assignment updated successfully')
      setSnackbarOpen(true)
      onSubmitSuccess?.()
    } catch (error) {
      console.error('Error updating assignment', error)
      setSnackbarMessage('Failed to update assignment')
      setSnackbarOpen(true)
    }
  }

  return (
    <div className='flex w-full flex-col space-y-4 p-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdate)}>
          {/* Champ Titre */}
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  {editable ? (
                    <Input {...field} className='bg-white text-black' />
                  ) : (
                    <p className='text-black'>{initialTitle}</p>
                  )}
                </FormControl>
                <FormMessage className='text-sm text-red-900' />
              </FormItem>
            )}
          />
          {/* Champ Date */}
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  {editable ? (
                    <Input
                      type='date'
                      {...field}
                      className='bg-white text-black'
                    />
                  ) : (
                    <p className='text-black'>{initialDate}</p>
                  )}
                </FormControl>
                <FormMessage className='text-sm text-red-900' />
              </FormItem>
            )}
          />
          {/* Champ Réponses */}
          {!editable ? ( // Affiche le FormItem seulement si editable est faux
            <FormField
              control={form.control}
              name='responses'
              render={({ field }) => (
                <FormItem className='mb-4'>
                  <FormLabel>Responses</FormLabel>
                  <FormControl>
                    {/* Afficher un texte par défaut si aucune réponse n'est fournie */}
                    <div>
                      <p className='text-black'>
                        {initialResponses ||
                          'integration du composant de la réponse'}
                      </p>
                      <ResponseSearch
                        Assignment_Id={'6718fb52cb7f4be7e1e77151'}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className='text-sm text-red-900' />
                </FormItem>
              )}
            />
          ) : (
            <></>
          )}

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Description (à faire avec richText) </FormLabel>
                <FormControl>
                  {editable ? (
                    <Input
                      {...field}
                      as='textarea'
                      rows={4}
                      style={{ height: '100px', resize: 'vertical' }}
                      placeholder='Enter assignment description...'
                    />
                  ) : (
                    <p className='text-black'>{initialDescription}</p>
                  )}
                </FormControl>
                <FormMessage className='text-sm text-red-900' />
              </FormItem>
            )}
          />

          {/* Bouton de soumission */}
          {editable && (
            <Button
              className='mt-4'
              type='submit'
              isDisabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          )}
        </form>
      </Form>

      {/* Snackbar pour afficher le message de succès ou d'erreur */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarMessage.includes('success') ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AssignmentForm
