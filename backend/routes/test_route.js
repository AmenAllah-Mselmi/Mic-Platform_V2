// backend/routes/upload_route.js
const express = require('express')
const multer = require('multer')
const uploadController = require('../controllers/upload_controller') // Import du contrôleur

const route = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

/**
 * @swagger
 * /api/test/upload:
 *   post:
 *     summary: Upload a file and convert it to JSON
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: The Excel file to upload
 *     responses:
 *       200:
 *         description: File uploaded and converted to JSON
 *       500:
 *         description: Error during file conversion
 */
route.post('/upload', upload.single('file'), uploadController.uploadFile)

module.exports = route
