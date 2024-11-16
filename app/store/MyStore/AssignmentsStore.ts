import { create } from 'zustand'
import { Assignment } from '../Models/Assignment'
import assignmentService from '../Controller/AssignmentController'

interface AssignmentState {
  assignments: Assignment[]
  isLoading: boolean
  error: string | null

  fetchAssignments: (departmentId: string) => Promise<void>
  fetchAllAssignments: () => Promise<void>
  createAssignment: (
    newAssignment: Omit<Assignment, '_id'>,
    departmentId: string
  ) => Promise<void>
  updateAssignment: (
    assignmentId: string,
    updatedAssignment: Partial<Assignment>
  ) => Promise<void>
  deleteAssignment: (assignmentId: string) => Promise<void>
}

export const useAssignmentStore = create<AssignmentState>(set => ({
  assignments: [],
  isLoading: false,
  error: null,

  // Fetch assignments by department ID
  fetchAssignments: async (departmentId: string) => {
    set({ isLoading: true, error: null })
    try {
      const assignments = await assignmentService.fetchAssignments(departmentId)
      set({ assignments: assignments || [], isLoading: false })
    } catch (error) {
      set({ error: 'Error fetching assignments', isLoading: false })
    }
  },

  // Fetch all assignments
  fetchAllAssignments: async () => {
    set({ isLoading: true, error: null })
    try {
      const assignments = await assignmentService.fetchAllAssignments()
      set({ assignments: assignments || [], isLoading: false })
    } catch (error) {
      set({ error: 'Error fetching all assignments', isLoading: false })
    }
  },

  // Create a new assignment
  createAssignment: async (
    newAssignment: Omit<Assignment, '_id'>,
    departmentId: string
  ) => {
    set({ isLoading: true, error: null })
    try {
      const createdAssignment = await assignmentService.createAssignment(
        newAssignment,
        departmentId
      )
      set(state => ({
        assignments: [
          ...state.assignments,
          { ...newAssignment, _id: createdAssignment._id }
        ],
        isLoading: false
      }))
    } catch (error) {
      set({ error: 'Error creating assignment', isLoading: false })
    }
  },

  // Update an assignment
  updateAssignment: async (
    assignmentId: string,
    updatedAssignment: Partial<Assignment>
  ) => {
    // Set loading state and clear previous error
    set({ isLoading: true, error: null })

    try {
      // Attempt to update the assignment via the service
      await assignmentService.updateAssignment(assignmentId, updatedAssignment)

      // Update the state with the new assignment data
      set(state => ({
        assignments: state.assignments.map(assignment =>
          assignment._id === assignmentId
            ? { ...assignment, ...updatedAssignment }
            : assignment
        ),
        isLoading: false // Reset loading state on success
      }))
    } catch (error) {
      // Handle error by setting error message and resetting loading state
      set({ error: 'Error updating assignment', isLoading: false })
    }
  },

  // Delete an assignment
  deleteAssignment: async (assignmentId: string) => {
    set({ isLoading: true, error: null })
    try {
      await assignmentService.deleteAssignment(assignmentId)
      set(state => ({
        assignments: state.assignments.filter(
          assignment => assignment._id !== assignmentId
        ),
        isLoading: false
      }))
    } catch (error) {
      set({ error: 'Error deleting assignment', isLoading: false })
    }
  }
}))
