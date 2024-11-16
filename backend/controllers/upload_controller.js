// backend/controllers/upload_controller.js
const xlsx = require('xlsx')

exports.uploadFile = (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' })
    const sheet_name_list = workbook.SheetNames

    const jsonData = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    )

    console.log(jsonData)

    res.json(jsonData)
  } catch (error) {
    console.error('Erreur lors de la conversion du fichier:', error)
    res.status(500).send('Erreur lors de la conversion du fichier')
  }
}
