'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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

const departmentSchema = z.object({
  Name: z.string().nonempty({ message: 'Name is required' }),
  Description: z.string().nonempty({ message: 'Description is required' })
})

export default function DepartmentForm() {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      Name: '',
      Description: ''
    }
  })

  const onSubmit = async data => {
    setLoading(true)
    try {
      console.log('Department Submitted', data)
      // Simulate an API call
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Submission failed:', error)
      setLoading(false)
    }
  }

  return (
    <div className='flex h-full flex-col items-center justify-center rounded-xl border bg-slate-300 shadow-2xl'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='Name'
              render={({ field }) => (
                <FormItem className='mb-5'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter name' {...field} />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Description'
              render={({ field }) => (
                <FormItem className='mb-5'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter description' {...field} />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='h-12 w-full rounded-md bg-gradient-to-r from-secondary to-primary text-white'
            >
              {loading ? 'Loading...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
