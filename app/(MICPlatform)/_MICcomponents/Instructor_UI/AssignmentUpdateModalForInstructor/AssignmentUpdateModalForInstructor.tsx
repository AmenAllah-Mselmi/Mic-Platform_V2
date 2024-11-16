'use client'
import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter
} from '@nextui-org/react'
import { Input } from '@/components/ui/input'
import { useAssignmentStore } from '@/app/store/MyStore/AssignmentsStore'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import RichTextEditor from '@/app/(MICPlatform)/_MICcomponents/RichTextEditor/RichTextEditor'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Alert, Snackbar } from '@mui/material'

// Helper function to extract plain text from HTML content
function extractTextFromHTML(html: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  return doc.body.textContent?.trim() || ''
}

// Define the schema for form validation using Zod
const formSchema = z.object({
  title: z.string().nonempty('Title is required.'),
  description: z
    .string()
    .refine(value => extractTextFromHTML(value).trim().length >= 5, {
      message: 'The description must be at least 5 characters long.'
    }),
  date: z.string().nonempty('Date is required.')
})

interface UpdateAssignmentModalProps {
  isOpen: boolean
  onClose: () => void
  assignmentId: string
  initialTitle: string
  initialDescription: string
  initialDate: string
}

const UpdateAssignmentModal: React.FC<UpdateAssignmentModalProps> = ({
  isOpen,
  onClose,
  assignmentId,
  initialTitle,
  initialDescription,
  initialDate
}) => {
  const { updateAssignment } = useAssignmentStore()

  // State for Snackbar control
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialTitle,
      description: initialDescription,
      date: initialDate
    }
  })

  // Update form values when initial props change
  useEffect(() => {
    form.reset({
      title: initialTitle,
      description: initialDescription,
      date: initialDate
    })
  }, [initialTitle, initialDescription, initialDate, form])

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
      DueDate: data.date
    }

    console.log('Attempting to update assignment with data:', updatedAssignment)

    try {
      // Call the update function from the store and await its resolution
      const result = await updateAssignment(assignmentId, updatedAssignment)

      console.log('Update result:', result) // Log the result from the store function

      setSnackbarMessage('Assignment updated successfully')
      setSnackbarOpen(true)
      onClose() // Close modal after update
    } catch (error) {
      console.error('Error updating assignment', error)
      setSnackbarMessage('Failed to update assignment')
      setSnackbarOpen(true)
    }
  }

  return (
    <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className='flex flex-col'>Update Assignment</ModalHeader>
        <ModalBody className='flex w-full flex-col space-y-4 p-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)}>
              {/* Title Input Field */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='mb-4'>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className='text-sm text-red-900' />
                  </FormItem>
                )}
              />

              {/* Description Input Field with Rich Text Editor */}
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        content={field.value || ''}
                        onChange={value => {
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage className='text-sm text-red-900' />
                  </FormItem>
                )}
              />

              {/* Date Input Field */}
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='mb-4'>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage className='text-sm text-red-900' />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                className='mt-4'
                type='submit'
                isDisabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Updating...' : 'Update'}
              </Button>
            </form>
          </Form>
        </ModalBody>
        <ModalFooter className='flex justify-start'>
          <Button color='error' variant='light' onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>

      {/* Snackbar to show success or error message */}
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
    </Modal>
  )
}

export default UpdateAssignmentModal
