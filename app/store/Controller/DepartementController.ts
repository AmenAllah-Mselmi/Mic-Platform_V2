import axios from 'axios';
import { ENDPOINTS } from '../constants/api';
import { Department } from '../Models/Departement';

// Fetch all departments
export const fetchDepartments = async (): Promise<Department[]> => {
  try {
    const response = await axios.get<Department[]>(ENDPOINTS.FETCH_DEPARTEMENTS());
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des départements:', error);
    throw error;
  }
};

// Create a new department
export const createDepartment = async (department: Department): Promise<Department> => {
  try {
    const response = await axios.post<Department>(ENDPOINTS.CREATE_DEPARTEMENT(), department);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du département:', error);
    throw error;
  }
};

// Update an existing department by ID
export const updateDepartment = async (departmentId: string, department: Partial<Department>): Promise<Department> => {
  try {
    const response = await axios.put<Department>(ENDPOINTS.UPDATE_DEPARTEMENT(departmentId), department);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du département:', error);
    throw error;
  }
};

// Delete a department by ID
export const deleteDepartment = async (departmentId: string): Promise<void> => {
  try {
    await axios.delete(ENDPOINTS.DELETE_DEPARTEMENT(departmentId));
  } catch (error) {
    console.error('Erreur lors de la suppression du département:', error);
    throw error;
  }
};
