'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Button, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/navigation';
import { useAssignmentStore } from '@/app/store/MyStore/AssignmentsStore';
import { useAuthStore } from '@/app/store/MyStore/AuthStore';
import PaginationComponent from '../../_MICcomponents/PaginationComponent/PaginationComponent';
import AssignmentCardForInstructor from '../../_MICcomponents/Instructor_UI/AssignmentCardForInstructor/AssignmentCardForInstructor';
import EnhancedTable from '../../_MICcomponents/Admin_UI/TableComponent/TableComponent';
import UpdateAssignmentModal from '../../_MICcomponents/Instructor_UI/AssignmentUpdateModalForInstructor/AssignmentUpdateModalForInstructor';
import DeleteAssignmentModal from '../../_MICcomponents/Instructor_UI/AssignmentDeleteModalForInstructor/AssignmentDeleteModalForInstructor';
import AssignmentModal from '../../_MICcomponents/assignment_UI/AssignmentModal';
import { toast } from 'react-toastify';
import { set } from 'date-fns';

const Page = () => {
  const router = useRouter();
  const assignments = useAssignmentStore((state) => state.assignments);
  const fetchAssignments = useAssignmentStore((state) => state.fetchAssignments);
  const deleteAssignment = useAssignmentStore((state) => state.deleteAssignment);
  const user = useAuthStore((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  const [openAssignmentModal, setOpenAssignmentModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        await fetchAssignments(user.DepartmentId);
      } catch (error) {
        toast.error('Failed to fetch assignments');
      }
    };
    loadAssignments();
  }, [fetchAssignments, user.DepartmentId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssignments = React.useMemo(() => {
    return assignments ? assignments.slice(indexOfFirstItem, indexOfLastItem) : [];
  }, [assignments, indexOfFirstItem, indexOfLastItem]);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const handleEditAssignment = (id) => {
    const assignment = assignments.find((a) => a._id === id);
    if (assignment) {
      setEditingAssignment(assignment);
      setOpenUpdateDialog(true);
    }
  };

  const handleDeleteAssignment = (id) => {
    setAssignmentToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteAssignment = async () => {
    if (assignmentToDelete) {
      try {
        await deleteAssignment(assignmentToDelete);
        toast.success('Assignment deleted successfully');
      } catch {
        toast.error('Failed to delete assignment');
      } finally {
        setOpenDeleteDialog(false);
        setAssignmentToDelete(null);
      }
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const headCells = [
    { id: 'Title', numeric: false, disablePadding: true, label: 'Title' },
    { id: 'DueDate', numeric: false, disablePadding: false, label: 'Due Date' },
  ];

  return (
    <>
      {isMobile ? (
        <Box className="container mx-auto flex flex-col items-center" sx={{ mt: 5 }}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => router.push(`/Instructor/create?departmentId=${user.DepartmentId}`)}
          >
            Add New Assignment
          </Button>
          {currentAssignments.length > 0 ? (
            currentAssignments.map((assignment) => (
              <AssignmentCardForInstructor
                key={assignment._id}
                assignment={assignment}
                onEdit={() => handleEditAssignment(assignment._id)}
                onDelete={() => handleDeleteAssignment(assignment._id)}
                onOpenAssignmentModal={() => {
                  setSelectedAssignment(assignment);
                  setOpenAssignmentModal(true);
                }}
              />
            ))
          ) : (
            <Typography>No assignments available</Typography>
          )}
          <PaginationComponent
            currentPage={currentPage}
            totalItems={assignments ? assignments.length : 0}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </Box>
      ) : (
        <Box sx={{ width: '90%', mx: 'auto', mt: 5 }}>
          <EnhancedTable
            data={assignments}
            headCells={headCells}
            onDelete={handleDeleteAssignment}
            title="List of Assignments"
            renderRowActions={(row) => (
              <>
                <Button onClick={() => handleEditAssignment(row._id)}>Edit</Button>
                <Button
                  onClick={() => {
                    setSelectedAssignment(row);
                    setOpenAssignmentModal(true);
                  }}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  onClick={() => router.push(`/Instructor/responses?assignmentId=${row._id}`)}
                >
                  View Responses
                </Button>
              </>
            )}
          />
        </Box>
      )}

      {editingAssignment && (
        <UpdateAssignmentModal
          isOpen={openUpdateDialog}
          onClose={() => {
            setOpenUpdateDialog(false);
            setEditingAssignment(null);
          }}
          assignmentId={editingAssignment._id}
          initialTitle={editingAssignment.Title}
          initialDescription={editingAssignment.Description}
          initialDate={editingAssignment.DueDate}
        />
      )}

      {openDeleteDialog && (
        <DeleteAssignmentModal
          isOpen={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={confirmDeleteAssignment}
        />
      )}

      {selectedAssignment && (
        <AssignmentModal
        isOpen={openAssignmentModal}
        onOpenChange={setOpenAssignmentModal}
        instructor={selectedAssignment.Instructor}
        date={selectedAssignment.DueDate}
        content={selectedAssignment.Description}
        resources={selectedAssignment.Resources}
        imageUrl={selectedAssignment.ImageUrl}
        assignmentId={selectedAssignment._id}
        />
      )}
    </>
  );
};

export default Page;
