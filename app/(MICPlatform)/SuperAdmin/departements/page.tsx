"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDepartmentStore } from '@/app/store/MyStore/DepartementStore';
import AddDepartmentModal from '../../_MICcomponents/CRUDDepartement/AjoutModal';
import UpdateDepartmentModal from '../../_MICcomponents/CRUDDepartement/updateModal';
import DeleteDepartmentModal from '../../_MICcomponents/CRUDDepartement/DeleteModal';

const DepartmentTable: React.FC = () => {
  const { departments, fetchDepartments, addDepartment, updateDepartment, removeDepartment } = useDepartmentStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedDepartmentName, setSelectedDepartmentName] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState(departments);

  // Fetch departments from the store on component mount
  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  // Sync filtered departments with the store's departments
  useEffect(() => {
    setFilteredDepartments(departments);
    console.log('depa=',departments)
  }, [departments]);

  // Handle search filter logic
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setFilteredDepartments(departments);
    } else {
      const filtered = departments.filter((element) =>
        element.DepartmentName.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredDepartments(filtered);
    }
  };
  // Add Department Modal Handlers
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  // Update Department Modal Handlers
  const openUpdateModal = (id: string, departmentName: string) => {
    setSelectedId(id);
    setSelectedDepartmentName(departmentName);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  // Delete Department Modal Handlers
  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  // Handle adding a new department and update state immediately
  const handleAdd = async (newDepartment: { DepartmentName: string }) => {
    try {
      await addDepartment(newDepartment);
      closeAddModal();
    } catch (error) {
      console.error('Failed to add department:', error);
      alert('Failed to add department. Please try again.');
    }
  };

  // Handle updating an existing department and update state immediately
  const handleUpdate = async (updatedDepartment: { DepartmentName: string }) => {
    try {
      await updateDepartment(selectedId, updatedDepartment);

      setFilteredDepartments((prev) =>
        prev.map((dept) =>
            dept._id === selectedId ? { ...dept, DepartmentName: updatedDepartment.DepartmentName } : dept
        )
    );

      closeUpdateModal();
    } catch (error) {
      console.error('Failed to update department:', error);
      alert('Failed to update department. Please try again.');
    }
  };

  // Handle deleting a department and update state immediately
  const handleConfirmDelete = async () => {
    try {
      await removeDepartment(selectedId);

      // Remove the department from local state
      setFilteredDepartments((prev) => prev.filter((department) => department._id !== selectedId));

      closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete department:', error);
      alert('Failed to delete department. Please try again.');
    }
  };

  return (
    <>
      <div className="bg-white h-fit w-9/12 flex flex-col justify-center items-center border-gray-400 border-2 border-solid">
        <div className="w-full bg-blue-500 flex justify-between px-5 items-center h-20">
          <h1 className="w-1/2 text-2xl text-white my-auto">Manage Departments</h1>
          <div className="w-1/2 flex justify-end items-center">
            <input
              type="text"
              className="w-64 h-10 mr-5 rounded-sm p-2"
              placeholder="Search Department"
              onChange={handleSearch}
            />
            <div
              className="w-48 bg-green-400 cursor-pointer text-white rounded-sm border-none h-12 flex items-center justify-evenly"
              onClick={openAddModal}
            >
              <FontAwesomeIcon className="rounded-xl bg-white text-green-400 w-5 h-5" icon={faPlus} />
              Add New Department
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <table className="w-full overflow-x-visible">
            <thead className="w-full h-14 flex justify-center items-center bg-gray-100">
              <tr className="flex items-center justify-between w-full">
                <th className="w-3/12 text-center text-black text-lg">Department ID</th>
                <th className="w-6/12 text-center text-black text-lg">Department Name</th>
                <th className="w-3/12 text-center text-black text-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full border-x-2">
              {filteredDepartments.map((department) => (
                <tr
                  key={department._id}
                  className="flex items-center justify-between w-full border-t-2 border-gray-300 h-14"
                >
                  <td className="w-3/12 text-center text-black text-lg">{department._id}</td>
                  <td className="w-6/12 text-center text-black text-lg">{department.DepartmentName}</td>
                  <td className="w-3/12 flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faPen}
                      className="text-yellow-300 mr-8 w-7 h-6 cursor-pointer"
                      onClick={() => openUpdateModal(department._id, department.DepartmentName)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-600 w-7 h-6 cursor-pointer"
                      onClick={() => openDeleteModal(department._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modals for Adding, Updating, and Deleting */}
      <AddDepartmentModal isOpen={isAddModalOpen} onRequestClose={closeAddModal} handleAdd={handleAdd} />
      <UpdateDepartmentModal
        isOpen={isUpdateModalOpen}
        onRequestClose={closeUpdateModal}
        id={selectedId}
        departmentName={selectedDepartmentName}
        handleUpdate={handleUpdate}
      />
      <DeleteDepartmentModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleConfirmDelete} />
    </>
  );
};

export default DepartmentTable;
