const express = require('express')
const route = express.Router()
const assignmentController = require('../controllers/assignment_controller')
/**
 * @swagger
 * /api/assignment/department/{departmentId}/addAssignment:
 *   post:
 *     summary: Ajouter un nouvel assignment à un département
 *     description: Cette route permet d'ajouter un assignment à un département spécifique via l'ID du département.
 *     tags:
 *       - Assignments
 *     parameters:
 *       - in: path
 *         name: departmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du département auquel l'assignement sera ajouté
 *         example: "66fd5e20eac555ee63ec2d9d"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *                 description: Titre de l'Assignment
 *                 example: "Introduction to Web Development"
 *               Description:
 *                 type: string
 *                 description: Description de l'Assignment
 *                 example: "Build a simple static website using HTML, CSS, and JavaScript."
 *               DueDate:
 *                 type: string
 *                 format: date
 *                 description: Date limite de l'Assignment
 *                 example: "2024-11-30"
 *               Instructor:
 *                 type: string
 *                 description: ID de l'instructeur qui ajoute l'Assignment
 *                 example: "64fbad8b6c598b43d788a843"
 *               Attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liens vers des ressources supplémentaires
 *                 example: ["link-to-resource1", "link-to-resource2"]
 *               Responses:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Soumissions des étudiants (initialement vide)
 *                 example: []
 *     responses:
 *       201:
 *         description: Assignment créé et ajouté au département avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment created successfully"
 *                 assignment:
 *                   $ref: '#/components/schemas/Assignment'
 *       404:
 *         description: Département non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Department not found"
 *       500:
 *         description: Erreur lors de la création de l'Assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
route.post(
  '/department/:departmentId/addAssignment',
  assignmentController.addAssignment
)

route.delete('/deleteAssignment/:id', assignmentController.deleteAssignment)
route.put('/updateAssignment/:id', assignmentController.updateAssignment)
/**
 * @swagger
 * /api/assignment/getAssignments:
 *   get:
 *     summary: Récupérer la liste des assignments
 *     responses:
 *       200:
 *         description: Liste des assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *
 *       404:
 *         description: Erreur lors de la récupération des membres
 */
route.get('/getAssignments', assignmentController.getAssignments)
route.get('/getAssignmentById/:id', assignmentController.getAssignmentById)

module.exports = route
