"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useInstructorStore } from "@/app/store/MyStore/InstructorStore"; // Zustand store for instructors
import { useDepartmentStore } from "@/app/store/MyStore/DepartementStore"; // Zustand store for departments
import { Instructor } from "@/app/store/Models/Instructor"; // Import the Instructor type

type AjoutInstructorProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const AjoutInstructor: React.FC<AjoutInstructorProps> = ({ isOpen, onRequestClose }) => {
  // Initialize the state for a new instructor (Remove _id)
  const [instructor, setInstructor] = useState<Omit<Instructor, "_id">>({
    NomPrenom: "",
    Email: "",
    Password: "",
    Role: "instructor", // Default role
    Adresse: "",
    ImageLink: "",
    DepartmentId: "", // For the selected department
  });

  // Fetch departments from Zustand
  const { departments, fetchDepartments } = useDepartmentStore((state) => ({
    departments: state.departments,
    fetchDepartments: state.fetchDepartments,
  }));

  // Fetch instructor actions from Zustand
  const addInstructor = useInstructorStore((state) => state.addInstructor);

  // Fetch departments once when the modal loads
  useEffect(() => {
    const loadDepartments = async () => {
      await fetchDepartments();
    };
    loadDepartments();
  }, [fetchDepartments]);

  // Handle input changes for instructor fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInstructor({ ...instructor, [name]: value });
  };

  // Handle image input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInstructor((prev) => ({ ...prev, ImageLink: reader.result as string }));
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };

  // Handle form submission (Remove _id from the payload)
// Handle form submission (Remove _id from the payload)
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    await addInstructor(instructor); // Add instructor via Zustand action
    
    alert("Instructor added successfully!");
    location.reload();
    onRequestClose(); 
    setInstructor({
      NomPrenom: "",
      Email: "",
      Password: "",
      Role: "instructor",
      Adresse: "",
      ImageLink: "",
      DepartmentId: "",
    }); // Reset form
  } catch (error) {
    console.error("Failed to add instructor:", error);
    alert("Failed to add instructor. Please try again.");
  }
};


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex justify-center items-center inset-0 bg-gray-700 bg-opacity-75 fixed"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Ajout d'un nouvel instructeur</h2>
        <form onSubmit={handleSubmit}>
          {/* Instructor Name Input */}
          <div className="mb-4">
            <label htmlFor="nom-prenom" className="block text-sm font-medium text-gray-700 mb-1">
              Nom et Prénom:
            </label>
            <input
              type="text"
              id="nom-prenom"
              name="NomPrenom"
              value={instructor.NomPrenom}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Instructor Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="Email"
              value={instructor.Email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Instructor Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe:
            </label>
            <input
              type="password"
              id="password"
              name="Password"
              value={instructor.Password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Instructor Address Input */}
          <div className="mb-4">
            <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse:
            </label>
            <input
              type="text"
              id="adresse"
              name="Adresse"
              value={instructor.Adresse}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Instructor Image Upload */}
          <div className="mb-4">
            <label htmlFor="image-link" className="block text-sm font-medium text-gray-700 mb-1">
              Image:
            </label>
            <input
              type="file"
              id="image-link"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Department Selection */}
          <div className="mb-4">
            <label htmlFor="departement" className="block text-sm font-medium text-gray-700 mb-1">
              Département:
            </label>
            <select
              id="departement"
              name="DepartmentId"
              value={instructor.DepartmentId}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="" disabled>Sélectionnez le département</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.DepartmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
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

export default AjoutInstructor;
