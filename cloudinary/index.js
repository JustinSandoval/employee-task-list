const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        // console.log(file)
        return {
            folder: 'EmployeeTaskList',
            // allowed_formats: ['jpeg', 'jpg', 'png', 'pdf', 'docx'],
            resource_type: 'auto',
            public_id: `${file.originalname}`
        }
    }
})

module.exports = {
    cloudinary,
    storage
}
