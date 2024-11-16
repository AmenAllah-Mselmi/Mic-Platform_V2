import axiosInstance from '@/app/axiosInstance'
import { ENDPOINTS } from '../constants/api'
import { Assignment } from '../Models/Assignment'

const assignmentService = {
  // Fetch assignments by department ID
  fetchAssignments: async (
    departmentId: string
  ): Promise<Assignment[] | undefined> => {
    try {
      const response = await axiosInstance.get<Assignment[]>(
        ENDPOINTS.FETCH_ASSIGNMENTS(departmentId)
      )
      console.log('Fetched Assignments:', response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching assignments:', error)
      throw error // Throw error to handle it in the component if needed
    }
  },

  // Fetch all assignments
  fetchAllAssignments: async (): Promise<Assignment[] | undefined> => {
    try {
      const response = await axiosInstance.get<Assignment[]>(
        ENDPOINTS.FETCH_ALL_Assignements()
      )
      console.log('Fetched All Assignments:', response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching all assignments:', error)
      throw error // Throw error to handle it in the component if needed
    }
  },

  // Create a new assignment with department ID
  createAssignment: async (
    newAssignment: Omit<Assignment, '_id'>,
    departmentId: string
  ): Promise<Assignment | undefined> => {
    try {
      const response = await axiosInstance.post<Assignment>(
        ENDPOINTS.CREATE_ASSIGNMENT(departmentId), // Using departmentId here
        newAssignment
      )
      console.log('Created Assignment:', response.data)
      return response.data
    } catch (error) {
      console.error('Error creating assignment:', error)
      throw error // Throw error to handle it in the component if needed
    }
  },

  // Update an existing assignment
  updateAssignment: async (
    assignmentId: string,
    updatedAssignment: Partial<Assignment>
  ): Promise<Assignment | undefined> => {
    try {
      const response = await axiosInstance.put<Assignment>(
        ENDPOINTS.UPDATE_ASSIGNMENT(assignmentId),
        updatedAssignment
      )
      console.log('Updated Assignment:', response.data)
      return response.data
    } catch (error) {
      console.error('Error updating assignment:', error)
      throw error // Throw error to handle it in the component if needed
    }
  },

  // Delete an assignment
  deleteAssignment: async (assignmentId: string): Promise<void> => {
    try {
      await axiosInstance.delete(ENDPOINTS.DELETE_ASSIGNMENT(assignmentId))
      console.log('Deleted Assignment:', assignmentId)
    } catch (error) {
      console.error('Error deleting assignment:', error)
      throw error // Throw error to handle it in the component if needed
    }
  }
}

export default assignmentService
