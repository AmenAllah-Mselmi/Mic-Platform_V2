'use client'

import RichTextEditor from './../../_MICcomponents/RichTextEditor/RichTextEditor'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAssignmentStore } from '@/app/store/MyStore/AssignmentsStore'
import { toast } from 'react-toastify' // Import toast
import { sub } from 'date-fns'
import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

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
    })
})

export default function Create() {
  const { createAssignment } = useAssignmentStore() // Use Zustand store

  // State for Snackbar control
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const onSubmit = async (data: any) => {
    const newAssignment = {
      Title: data.title,
      Description: data.description,
      DueDate: new Date().toISOString(),
      Attachments: []
    }

    // Call the createAssignment function from the Zustand store
    try {
      await createAssignment(newAssignment, departmentId) // Create assignment using Zustand action
      setSnackbarMessage('Assignment created successfully') // Set success message
      setSnackbarOpen(true) // Open Snackbar
      form.reset() // Reset the form after submission
    } catch (error) {
      toast.error('Failed to create assignment.')
      console.error('Assignment creation error:', error)
    }
  }
  const searchParams = useSearchParams()
  const departmentId = searchParams.get('departmentId') // Récupère l'ID du département

  return (
    <div className='mx-auto w-11/12 max-w-3xl pt-36 text-slate-700'>
      <h1 className='mb-7 text-start text-4xl'>Create a new assignment</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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

          {/* Submit Button */}
          <Button className='mt-4' type='submit'>
            Submit
          </Button>
        </form>
      </Form>

      {/* Snackbar to show success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity='success'
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}
