"use client";

import { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useInstructorStore } from "@/app/store/MyStore/InstructorStore";
import { useDepartmentStore } from "@/app/store/MyStore/DepartementStore"; // Import the Zustand store

type UpdateInstructorProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  id: string;
};

const UpdateInstructorModal: React.FC<UpdateInstructorProps> = ({
  isOpen,
  onRequestClose,
  id,
}) => {
  const [instructorName, setInstructorName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [imageLink, setImageLink] = useState<File | null>(null); // State for image file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Preview URL for image
  const inputRef = useRef<HTMLInputElement>(null); // Input reference for focus control

  // Zustand actions to update instructor and get departments
  const updateInstructor = useInstructorStore((state) => state.updateInstructor);
  const departments = useDepartmentStore((state) => state.departments);
  const instructors = useInstructorStore((state) => state.instructors);

  // Fetch the instructor details from Zustand store when the modal is opened
  useEffect(() => {
    if (isOpen) {
      const instructor = instructors.find((inst) => inst._id === id);
      if (instructor) {
        setInstructorName(instructor.NomPrenom);
        setDepartmentId(instructor.DepartmentId);
        setEmail(instructor.Email || ""); // Set email if available
        setPassword(instructor.Password || ""); // Set unhashed password if available
        setImagePreview(instructor.ImageLink || ""); // Set the initial preview image
      }
      // Set focus on input when modal opens
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [id, isOpen, instructors]);

  // Handle file change for image upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageLink(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set image preview
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null); // Reset preview if no file is selected
    }
  };

  // Handle form submission to update the instructor
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedInstructor = {
      NomPrenom: instructorName,
      DepartmentId: departmentId,
      Email: email,
      Password: password, // Include unhashed password
      ImageLink: imageLink ? URL.createObjectURL(imageLink) : null, // Handle image file
    };

    try {
      await updateInstructor(id, updatedInstructor); // Call the Zustand action
      alert("Instructor updated successfully!");
      window.location.reload(); // Refresh the page or you can handle state update here
      onRequestClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error updating the instructor:", error);
      alert("Failed to update the instructor. Please try again.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false} // Prevent react-modal from hiding other content
      className="flex justify-center items-center w-full h-full"
    >
      <main className="bg-white flex justify-evenly items-center flex-col mt-14 h-[600px] w-[400px] relative">
        <FontAwesomeIcon
          icon={faTimes}
          className="absolute top-3 right-2 text-black w-4 h-4 font-bold cursor-pointer"
          onClick={onRequestClose}
        />
        <h1 className="text-blue-400 font-bold text-xl">Update Instructor</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          {/* Input field for Instructor Name */}
          <div className="w-5/6 mb-2">
            <label htmlFor="instructor-name" className="block mb-1">
              Instructor Name:
            </label>
            <input
              ref={inputRef} // Input reference for focus
              type="text"
              id="instructor-name"
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>

          {/* Input field for Email */}
          <div className="w-5/6 mb-2">
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>

          {/* Input field for Password */}
          <div className="w-5/6 mb-2">
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>

          {/* Select for Department */}
          <div className="w-5/6 mb-2">
            <label htmlFor="department" className="block mb-1">
              Department:
            </label>
            <select
              id="department"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.DepartmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="w-5/6 mb-2">
            <label htmlFor="image-upload" className="block mb-1">
              Upload Image:
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 w-full"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="h-20 w-20 object-cover rounded-full"
                  width={80} // Specify the width
                  height={80} // Specify the height
                />
              </div>
            )}
          </div>

          {/* Submit button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 w-5/6 rounded-md border-none text-xl"
            type="submit"
          >
            Update
          </button>
        </form>
      </main>
    </Modal>
  );
};

export default UpdateInstructorModal;
