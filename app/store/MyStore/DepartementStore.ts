import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Department } from '../Models/Departement';
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment } from '../Controller/DepartementController';

export type DepartmentState = {
  departments: Department[];
};

export type DepartmentActions = {
  fetchDepartments: () => Promise<void>;
  addDepartment: (department: Department) => Promise<void>;
  updateDepartment: (DepartmentId: string, department: Partial<Department>) => Promise<void>;
  removeDepartment: (DepartmentId: string) => Promise<void>;
};

// Zustand Store for Departments
export const useDepartmentStore = create<DepartmentState & DepartmentActions>()(
  
    (set) => ({
      departments: [],

      fetchDepartments: async () => {
        try {
          const data = await fetchDepartments();
          console.log(data)
          set({ departments: data });
        } catch (error) {
          console.error('Error fetching departments:', error);
        }
      },

      addDepartment: async (department) => {
        try {
          const newDepartment = await createDepartment(department);
          set((state) => ({ departments: [...state.departments, newDepartment] }));
        } catch (error) {
          console.error('Error adding department:', error);
        }
      },

      updateDepartment: async (DepartmentId, department) => {
        try {
          // Call the API to update the department
          const updatedDepartment = await updateDepartment(DepartmentId, department); // Ensure this is your API function
      
          // Update the state in the store
          set((state) => ({
            departments: state.departments.map((dept) =>
              dept._id === DepartmentId ? updatedDepartment : dept
            ),
          }));
        } catch (error) {
          console.error('Error updating department:', error);
        }
      },
      

      removeDepartment: async (DepartmentId) => {
        try {
          await deleteDepartment(DepartmentId);
          set((state) => ({
            departments: state.departments.filter((dept) => dept._id !== DepartmentId),
          }));
        } catch (error) {
          console.error('Error deleting department:', error);
        }
      },
    })
);
