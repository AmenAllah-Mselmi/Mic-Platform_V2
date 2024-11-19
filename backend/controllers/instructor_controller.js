const { Instructor } = require('../models/user')
const { department } = require('../models/department')
const session = require('../models/session')
const Assignment = require('../models/assignment')

const controller = {
  // created by Mariem
  create_Instructor_with_department: async (req, res) => {
    try {
      const instructorData = req.body; // Get all data from the request body as one object
  
      // Check if the department exists
      const Mydepartment = await department.findById(instructorData.DepartmentId); // Using 'DepartmentId' from the object
      if (!Mydepartment) {
        return res.status(404).json({ message: 'Department not found' });
      }
  
      // Create a new instructor with the department ID
      const instructor = new Instructor(instructorData); // All data is already combined in 'instructorData'
  
      // Save the instructor
      const savedInstructor = await instructor.save();
  
      // Optional: Add the instructor to the department's 'instructors' array
      Mydepartment.instructors.push(savedInstructor._id); // Add the instructor to the department
      await Mydepartment.save(); // Save the changes to the department
  
      // Return a response with the saved instructor details
      return res.status(201).json({
        message: 'Instructor added successfully',
        instructor: savedInstructor
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error adding instructor to department' });
    }
  },
  get_Instructors_names_and_ids_in_department: async (req, res) => {
    const { DepartmentId } = req.body

    try {
      const result = await department
        .findById(DepartmentId)
        .populate({
          path: 'instructors',
          select: '_id NomPrenom -__t'
        })
        .select('instructors')

      if (!result) {
        return res.status(404).json({ message: 'Département non trouvé' })
      }

      return res.status(200).json({ instructors: result.instructors })
    } catch (error) {
      console.error('Error fetching instructors:', error)
      return res.status(500).json({ message: 'Erreur serveur' })
    }
  },
  // --------------------------
  Instructor_add_Session_with_Assignment: async (req, res) => {
    try {
      const { departmentId } = req.params
      const { instructorId, sessionData, assignmentData } = req.body

      // Vérifiez que le département existe
      const Mydepartment = await department.findById(departmentId)
      if (!Mydepartment) {
        return res.status(404).json({ message: 'Department not found' })
      }

      // Créer une nouvelle session avec les données fournies
      const newSession = new session({
        Date: sessionData.Date,
        Description: sessionData.Description,
        Title: sessionData.Title,
        Instructor: instructorId
      })

      // Sauvegarder la session
      const savedSession = await newSession.save()

      // Créer l'Assignment et le lier à la session nouvellement créée
      const newAssignment = new Assignment({
        Title: assignmentData.Title,
        Description: assignmentData.Description,
        DueDate: assignmentData.DueDate,
        Instructor: instructorId,
        session: savedSession._id // Lier l'Assignment à la Session
      })

      // Sauvegarder l'Assignment
      const savedAssignment = await newAssignment.save()

      // Mettre à jour la session avec l'ID de l'Assignment
      savedSession.assignment = savedAssignment._id
      await savedSession.save()

      // Ajouter la session au département
      Mydepartment.sessions.push(savedSession._id)
      await Mydepartment.save()

      res.status(201).json({
        message: 'Session and Assignment added successfully',
        session: savedSession,
        assignment: savedAssignment
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  Instructor_add_Assignment_to_Session: async (req, res) => {
    try {
      const { instructorId, sessionId, assignmentData } = req.body

      // Vérifiez que le département existe
      const sessionExist = await session.findById(sessionId)
      if (!sessionExist) {
        return res.status(404).json({ message: 'session not found' })
      }
      // Créer l'Assignment et le lier à la session nouvellement créée
      const newAssignment = new Assignment({
        Title: assignmentData.Title,
        Description: assignmentData.Description,
        DueDate: assignmentData.DueDate,
        Instructor: instructorId,
        session: sessionExist._id // Lier l'Assignment à la Session
      })

      // Sauvegarder l'Assignment
      const savedAssignment = await newAssignment.save()

      // Mettre à jour la session avec l'ID de l'Assignment
      sessionExist.assignment = savedAssignment._id
      await sessionExist.save()

      res.status(201).json({
        message: 'Session and Assignment added successfully',
        session: sessionExist,
        assignment: savedAssignment
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  // end
  // for test
  // end test
  afficher_All: async (req, res) => {
    try {
      const Instructors = await Instructor.find()
      res.status(200).json(Instructors)
    } catch (error) {
      res.status(404).json({ message: 'Error in generating Instructors' })
    }
  },
  update_Instructor: async (req, res) => {
    try {
      const id = req.params.id
      const update = await Instructor.updateOne({ _id: id }, req.body)
      if (update.nModified === 0) {
        return res
          .status(404)
          .json({ message: 'Instructor not found or no changes made' })
      }
      res.status(200).json({ message: 'Instructor updated successfully' })
    } catch (error) {
      res.status(404).json({ message: 'Error in updating Instructor' })
    }
  },

  delete_Instructor: async (req, res) => {
    try {
      const id = req.params.id
      const deleted = await Instructor.deleteOne({ _id: id })
      if (deleted.deletedCount === 0) {
        return res.status(404).json({ message: 'Instructor not found' })
      }
      res.status(200).json({ message: 'Instructor deleted successfully' })
    } catch (error) {
      res.status(404).json({ message: 'Error in deleting Admin' })
    }
  },

  findInstructor: async (req, res) => {
    try {
      const id = req.params.id
      const instructor = await Instructor.findById(id)

      if (!instructor) {
        return res
          .status(404)
          .json({ message: "This instructor doesn't exist" })
      }

      return res.status(200).json(instructor)
    } catch (error) {
      console.error('Error in finding instructor:', error)
      return res.status(400).json({ message: 'Error in finding instructor' })
    }
  },

  count: async (req, res) => {
    try {
      const instructors = await Instructor.countDocuments()
      res.status(200).json(instructors)
    } catch (error) {
      res.status(404).json({ message: 'Error in counting instructors' })
    }
  }
}

module.exports = controller
