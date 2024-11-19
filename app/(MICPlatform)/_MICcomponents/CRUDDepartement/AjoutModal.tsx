"use client";
import { useState } from 'react';
import Modal from 'react-modal';
import { useDepartmentStore } from '@/app/store/MyStore/DepartementStore'; // Import Zustand store

type AjoutDepartementProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const AjoutDepartement: React.FC<AjoutDepartementProps> = ({ isOpen, onRequestClose }) => {
  const [DepartementName, setDepartementName] = useState('');

  // Get the addDepartment action from the Zustand store
  const addDepartment = useDepartmentStore((state) => state.addDepartment);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Define the new department details
    const newDepartement = {
      DepartmentName: DepartementName,
    };

    try {
      // Use the Zustand action to add a new department
     let response= await addDepartment(newDepartement);
      console.log('Department added:', response);
      onRequestClose(); // Close the modal
      alert('Department added successfully!');
      setDepartementName(''); // Reset form field
    } catch (error) {
      console.error('Failed to add department:', error);
      alert('Failed to add department. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex justify-center items-center inset-0 bg-gray-700 bg-opacity-75 fixed"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Ajout d'un nouveau département</h2>
        <form onSubmit={handleSubmit}>
          {/* Input field for Department Name */}
          <div className="mb-4">
            <label htmlFor="departement-name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom du Département:
            </label>
            <input
              type="text"
              id="departement-name"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
              value={DepartementName}
              onChange={(e) => setDepartementName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={onRequestClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AjoutDepartement; 