"use client";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddInstructorModal from '../../_MICcomponents/CRUDInstructors/AjoutModal';
import UpdateInstructorModal from '../../_MICcomponents/CRUDInstructors/updateModal';
import DeleteInstructorModal from '../../_MICcomponents/CRUDInstructors/DeleteModal';
import { useInstructorStore } from '@/app/store/MyStore/InstructorStore';
import { useDepartmentStore } from '@/app/store/MyStore/DepartementStore';

const InstructorsTable = () => {
  const { instructors, fetchInstructors, addInstructor, updateInstructor, removeInstructor } = useInstructorStore();
  const { departments, fetchDepartments } = useDepartmentStore();
  const [filter, setFilter] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  useEffect(() => {
    fetchInstructors();
    fetchDepartments();
  }, [fetchInstructors, fetchDepartments]);

  useEffect(() => {
    setFilter(instructors);
  }, [instructors]);
  useEffect(() => {
    fetchInstructors(); // Fetch instructors when the component mounts
  }, [fetchInstructors]);
  

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value === '') {
      setFilter(instructors);
    } else {
      const filteredInstructors = instructors.filter((instructor) =>
        instructor.NomPrenom.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilter(filteredInstructors);
    }
  };

  const getDepartmentName = (deptId) => {
    const department = departments.find((dept) => dept._id === deptId);
    return department ? department.DepartmentName : 'Unknown';
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openUpdateModal = (instructor) => {
    console.log('Opening update modal for:', instructor); // Debugging line
    setSelectedInstructor(instructor);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    console.log('Closing update modal'); // Debugging line
    setIsUpdateModalOpen(false);
    setSelectedInstructor(null); // Clear selected instructor
  };

  const openDeleteModal = (instructor) => {
    setSelectedInstructor(instructor);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleConfirmDelete = async () => {
    await removeInstructor(selectedInstructor._id);
    closeDeleteModal();
  };

  return (
    <>
      <div className="bg-white h-fit w-9/12 flex flex-col justify-center items-center border-gray-400 border-2 border-solid">
        <div className="w-full bg-blue-500 flex justify-between px-5 items-center h-20">
          <h1 className="w-1/2 text-2xl text-white my-auto">Manage Instructors</h1>
          <div className="w-1/2 flex justify-end items-center">
            <input
              type="text"
              className="w-64 h-10 mr-5 rounded-sm p-2"
              placeholder="Search Instructor"
              onChange={handleSearch}
            />
            <div
              className="w-48 bg-green-400 cursor-pointer text-white rounded-sm border-none h-12 flex items-center justify-evenly"
              onClick={openAddModal}
            >
              <FontAwesomeIcon className="rounded-xl bg-white text-green-400 w-5 h-5" icon={faPlus} />
              Add New Instructor
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <table className="w-full overflow-x-visible">
            <thead className="w-full h-14 flex justify-center items-center bg-gray-100">
              <tr className="flex items-center justify-between w-full">
                <th className="w-4/12 text-center text-black text-lg">Instructor Name</th>
                <th className="w-4/12 text-center text-black text-lg">Department</th>
                <th className="w-4/12 text-center text-black text-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full border-x-2">
              {filter.map((instructor, index) => (
                <tr key={index} className="flex items-center justify-between w-full border-t-2 border-gray-300 h-14">
                  <td className="w-4/12 text-center text-black text-lg">{instructor.NomPrenom}</td>
                  <td className="w-4/12 text-center text-black text-lg">
                    {getDepartmentName(instructor.DepartmentId)}
                  </td>
                  <td className="w-4/12 flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faPen}
                      className="text-yellow-300 mr-8 w-7 h-6 cursor-pointer"
                      onClick={() => openUpdateModal(instructor)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-600 w-7 h-6 cursor-pointer"
                      onClick={() => openDeleteModal(instructor)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddInstructorModal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        handleAdd={addInstructor} // Pass addInstructor to modal
      />
      {selectedInstructor && (
       <UpdateInstructorModal
       isOpen={isUpdateModalOpen}
       onRequestClose={closeUpdateModal}
       id={selectedInstructor?._id} // Pass the ID of the selected instructor
     />
     
      )}
      <DeleteInstructorModal 
        isOpen={isDeleteModalOpen} 
        onClose={closeDeleteModal} 
        onConfirm={handleConfirmDelete} 
      />
    </>
  );
};

export default InstructorsTable;
