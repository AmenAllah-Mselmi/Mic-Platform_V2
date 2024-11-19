import axios from 'axios';
import { ENDPOINTS } from '../constants/api';
import { Instructor } from '../Models/Instructor';

// Fetch all instructors
export const fetchInstructors = async (): Promise<Instructor[]> => {
  try {
    const response = await axios.get<Instructor[]>(ENDPOINTS.FETCH_INSTRUCTORS());
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des instructeurs:', error);
    throw error;
  }
};

// Create a new instructor
export const createInstructor = async (instructor: Instructor): Promise<Instructor> => {
  try {
    const response = await axios.post<Instructor>(ENDPOINTS.CREATE_INSTRUCTOR(), instructor);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'instructeur:', error);
    throw error;
  }
};

// Update an existing instructor by ID
export const updateInstructor = async (instructorId: string, instructor: Partial<Instructor>): Promise<Instructor> => {
  try {
    const response = await axios.put<Instructor>(ENDPOINTS.UPDATE_INSTRUCTOR(instructorId), instructor);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'instructeur:', error);
    throw error;
  }
};

// Delete an instructor by ID
export const deleteInstructor = async (instructorId: string): Promise<void> => {
  try {
    await axios.delete(ENDPOINTS.DELETE_INSTRUCTOR(instructorId));
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'instructeur:', error);
    throw error;
  }
};
