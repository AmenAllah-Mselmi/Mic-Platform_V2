const express = require('express')
const route = express.Router()

const instructorController = require('../controllers/instructor_controller')

/**
 * @swagger
 * /api/instructor/create-with-department:
 *   post:
 *     summary: Créer un nouvel instructeur
 *     description: Crée un instructeur et l'associe à un département avec les informations fournies dans le corps de la requête.
 *     tags:
 *       - Instructors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departmentId:
 *                 type: string
 *                 example: "615c1bc5e70b7e6f30f8f99c"
 *                 description: L'ID du département auquel l'instructeur sera associé
 *               instructorData:
 *                 type: object
 *                 properties:
 *                   NomPrenom:
 *                     type: string
 *                     example: "John Doe"
 *                     description: Nom et prénom de l'instructeur
 *                   Email:
 *                     type: string
 *                     format: email
 *                     example: "johndoe@example.com"
 *                     description: Email unique de l'instructeur
 *                   Password:
 *                     type: string
 *                     format: password
 *                     example: "password123"
 *                     description: Mot de passe de l'instructeur (au moins 8 caractères)
 *                   Role:
 *                     type: string
 *                     example: "instructor"
 *                     description: Le rôle de l'utilisateur (ici ce sera "instructor")
 *                   Adresse:
 *                     type: string
 *                     example: "123 rue de Paris"
 *                     description: Adresse de l'instructeur
 *                   ImageLink:
 *                     type: string
 *                     example: "http://example.com/image.jpg"
 *                     description: Lien vers l'image de profil de l'instructeur (optionnel)
 *     responses:
 *       201:
 *         description: Instructeur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Instructor added successfully"
 *                 instructor:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     NomPrenom:
 *                       type: string
 *                     Email:
 *                       type: string
 *                     Role:
 *                       type: string
 *                     Adresse:
 *                       type: string
 *                     ImageLink:
 *                       type: string
 *                     DepartmentId:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
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
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error adding instructor to department"
 */
route.post(
  '/create-with-department',
  instructorController.create_Instructor_with_department
)
/**
 * @swagger
 * /api/instructor/add-session-in-department:
 *   post:
 *     summary: Ajouter une session à un département
 *     description: Ajoute une nouvelle session à un département en l'associant à un instructeur avec les informations fournies dans le corps de la requête.
 *     tags:
 *       - Sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departmentId:
 *                 type: string
 *                 example: "615c1bc5e70b7e6f30f8f99c"
 *                 description: L'ID du département auquel la session sera associée
 *               instructorId:
 *                 type: string
 *                 example: "615c1bc5e70b7e6f30f8f123"
 *                 description: L'ID de l'instructeur qui gérera la session
 *               sessionData:
 *                 type: object
 *                 properties:
 *                   Title:
 *                     type: string
 *                     example: "Session de mathématiques"
 *                     description: Le titre de la session
 *                   Description:
 *                     type: string
 *                     example: "Cours de mathématiques pour le niveau intermédiaire"
 *                     description: La description de la session
 *                   Date:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-01T09:00:00Z"
 *                     description: Date et heure de la session
 *     responses:
 *       201:
 *         description: Session créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Session added successfully"
 *                 session:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "615c1bc5e70b7e6f30f8f456"
 *                     Title:
 *                       type: string
 *                     Description:
 *                       type: string
 *                     Date:
 *                       type: string
 *                       format: date-time
 *                     Instructor:
 *                       type: string
 *                       example: "615c1bc5e70b7e6f30f8f123"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     DepartmentId:
 *                       type: string
 *                       example: "615c1bc5e70b7e6f30f8f99c"
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
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error adding session to department"
 */
// route.post(
//   '/add-session-in-department',
//   instructorController.Instructor_add_Session_In_department
// )
/**
 * @swagger
 * /api/instructor/{instructorId}:
 *   get:
 *     summary: Récupérer les sessions par instructeur
 *     description: Récupère toutes les sessions associées à un instructeur spécifique en fonction de son ID.
 *     tags:
 *       - Sessions
 *     parameters:
 *       - name: instructorId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "615c1bc5e70b7e6f30f8f99c"
 *           description: L'ID de l'instructeur
 *     responses:
 *       200:
 *         description: Liste des sessions récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   Title:
 *                     type: string
 *                     example: "Introduction to AI"
 *                   Description:
 *                     type: string
 *                     example: "Learn the basics of artificial intelligence."
 *                   Instructor:
 *                     type: string
 *                     example: "615c1bc5e70b7e6f30f8f99c"
 *                   Date:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-02T10:00:00Z"
 *       404:
 *         description: Instructeur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Instructor not found"
 *       500:
 *         description: Erreur serveur lors de la récupération des sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error retrieving sessions"
 */
// route.get('/:instructorId', instructorController.getSessionsByInstructor)

/**
 * @swagger
 * /api/instructor/department/{departmentId}:
 *   get:
 *     summary: Récupérer les sessions par département
 *     description: Récupère toutes les sessions associées à un département spécifique en fonction de son ID.
 *     tags:
 *       - "implementer dans interface instructor"
 *     parameters:
 *       - name: departmentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "615c1bc5e70b7e6f30f8f99c"
 *           description: L'ID du département
 *     responses:
 *       200:
 *         description: Liste des sessions récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   Title:
 *                     type: string
 *                     example: "Advanced Web Development"
 *                   Description:
 *                     type: string
 *                     example: "A deep dive into modern web development practices."
 *                   Instructor:
 *                     type: string
 *                     example: "615c1bc5e70b7e6f30f8f99c"
 *                   Date:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-03T14:00:00Z"
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
 *         description: Erreur serveur lors de la récupération des sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error retrieving sessions"
 */
// route.get(
//   '/department/:departmentId',
//   instructorController.getSessionsByDepartment
// )

/**
 * @swagger
 * paths:
 *   /api/instructor/assignment/Instructor-add-Assignment-to-Session:
 *     post:
 *       summary: "Ajouter un Assignment à une Session par l'instructeur"
 *       description: "Cette fonction permet à un instructeur d'ajouter un Assignment à une session spécifique."
 *       tags:
 *         - "Member valider"
 *       requestBody:
 *         description: "Données nécessaires pour ajouter un Assignment à une session"
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 instructorId:
 *                   type: string
 *                   description: "ID de l'instructeur qui ajoute l'Assignment"
 *                   example: "64fbad8b6c598b43d788a843"
 *                 sessionId:
 *                   type: string
 *                   description: "ID de la session à laquelle l'Assignment doit être ajouté"
 *                   example: "64fbad8b6c598b43d788a839"
 *                 assignmentData:
 *                   type: object
 *                   description: "Données de l'Assignment à ajouter"
 *                   properties:
 *                     Title:
 *                       type: string
 *                       description: "Titre de l'Assignment"
 *                       example: "Développement API"
 *                     Description:
 *                       type: string
 *                       description: "Description de l'Assignment"
 *                       example: "Création d'une API REST avec Node.js"
 *                     DueDate:
 *                       type: string
 *                       format: date
 *                       description: "Date limite de l'Assignment"
 *                       example: "2024-12-31"
 *       responses:
 *         '201':
 *           description: "Session et Assignment ajoutés avec succès"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Session and Assignment added successfully"
 *                   session:
 *                     $ref: '#/components/schemas/Session'
 *                   assignment:
 *                     $ref: '#/components/schemas/Assignment'
 *         '404':
 *           description: "Session non trouvée"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Session not found"
 *         '500':
 *           description: "Erreur serveur"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Internal server error"
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64fbad8b6c598b43d788a839"
 *         Title:
 *           type: string
 *           example: "Introduction au développement"
 *         Description:
 *           type: string
 *           example: "Cours sur les bases du développement logiciel"
 *         Date:
 *           type: string
 *           format: date
 *           example: "2024-10-05"
 *         Instructor:
 *           type: string
 *           example: "64fbad8b6c598b43d788a843"
 *         assignment:
 *           type: string
 *           example: "64fbad8b6c598b43d788a847"
 *     Assignment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64fbad8b6c598b43d788a847"
 *         Title:
 *           type: string
 *           example: "Développement API"
 *         Description:
 *           type: string
 *           example: "Création d'une API REST avec Node.js"
 *         DueDate:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 *         Instructor:
 *           type: string
 *           example: "64fbad8b6c598b43d788a843"
 *         session:
 *           type: string
 *           example: "64fbad8b6c598b43d788a839"
 */
// route.post(
//   '/assignment/Instructor-add-Assignment-to-Session',
//   instructorController.Instructor_add_Assignment_to_Session
// )
route.post(
  '/assignment/Instructor-add-Assignment-to-Session',
  instructorController.Instructor_add_Assignment_to_Session
)
/**
 * @swagger
 * paths:
 *   /api/instructor/get-instructors-names:
 *     post:
 *       summary: "Obtenir les noms et IDs des instructeurs dans un département"
 *       description: "Cette fonction renvoie les noms et IDs des instructeurs d'un département spécifique."
 *       tags:
 *         - "Instructeurs"
 *       requestBody:
 *         description: "ID du département pour lequel récupérer les instructeurs"
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 DepartmentId:
 *                   type: string
 *                   description: "ID du département"
 *                   example: "670792e3ee0e13424434d371"
 *       responses:
 *         '200':
 *           description: "Liste des instructeurs dans le département"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   instructors:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: "ID de l'instructeur"
 *                           example: "64fbad8b6c598b43d788a840"
 *                         NomPrenom:
 *                           type: string
 *                           description: "Nom complet de l'instructeur"
 *                           example: "John Doe"
 *               example:
 *                 instructors:
 *                   - _id: "64fbad8b6c598b43d788a840"
 *                     NomPrenom: "John Doe"
 *                   - _id: "64fbad8b6c598b43d788a841"
 *                     NomPrenom: "Jane Smith"
 *         '404':
 *           description: "Département non trouvé"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Département non trouvé"
 *         '500':
 *           description: "Erreur serveur"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Erreur serveur"
 */
route.post(
  '/get-instructors-names',
  instructorController.get_Instructors_names_and_ids_in_department
)


route.get('/all', instructorController.afficher_All)
route.put('/update/:id', instructorController.update_Instructor)
route.delete('/delete/:id', instructorController.delete_Instructor)
route.get('/find/:id', instructorController.findInstructor)
route.get('/count', instructorController.count)

module.exports = route
