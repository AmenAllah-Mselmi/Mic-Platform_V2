"use client";
import { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDepartmentStore } from '@/app/store/MyStore/DepartementStore'; // Import the Zustand store

type UpdateDepartementProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  id: string;
};

const UpdateDepartement: React.FC<UpdateDepartementProps> = ({ isOpen, onRequestClose, id }) => {
  const [DepartementName, setDepartementName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // Input reference for focus control

  // Zustand action to update the department
  const updateDepartment = useDepartmentStore((state) => state.updateDepartment);
  const departments = useDepartmentStore((state) => state.departments);

  // Fetch the department details from Zustand store when the modal is opened
  useEffect(() => {
    if (isOpen) {
      const department = departments.find((dept) => dept._id === id);
      if (department) {
        setDepartementName(department.DepartmentName);
      }
      // Set focus on input when modal opens
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [id, isOpen, departments]);

  // Handle form submission to update the department
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedDepartment = {
      DepartmentName: DepartementName,
    };

    try {
      await updateDepartment(id, updatedDepartment); // Call the Zustand action
      alert('Department updated successfully!');
      window.location.reload();
      onRequestClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error updating the department:', error);
      alert('Failed to update the department. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false} // Prevent react-modal from hiding other content (helps with focus issues)
      className="flex justify-center items-center w-full h-full"
    >
      <main className="bg-white flex justify-evenly items-center flex-col mt-14 h-[500px] w-[400px] relative">
        <FontAwesomeIcon
          icon={faTimes}
          className="absolute top-3 right-2 text-black w-4 h-4 font-bold cursor-pointer"
          onClick={onRequestClose}
        />
        <h1 className="text-blue-400 font-bold text-xl">Update Department</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          {/* Input field for Department Name */}
          <div className="w-5/6 mb-2">
            <label htmlFor="departement-name" className="block mb-1">
              Department Name:
            </label>
            <input
              ref={inputRef} // Input reference for focus
              type="text"
              id="departement-name"
              value={DepartementName}
              onChange={(e) => setDepartementName(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>

          {/* Submit button */}
          <button className="bg-blue-500 text-white px-4 py-2 mt-4 w-5/6 rounded-md border-none text-xl" type="submit">
            Update
          </button>
        </form>
      </main>
    </Modal>
  );
};

export default UpdateDepartement;
