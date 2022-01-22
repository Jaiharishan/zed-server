const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'api/routers/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const vidStorage = new GridFsStorage({
    url: process.env.DB_URL,
    file: (req, file) => {
        const fileInfo = {
            filename: file.fieldname + '-' + Date.now(),
            bucketName: 'uploads'
        }
        return fileInfo
    }
})
const upload = multer({ storage: storage });
const uploadVideo = multer({ storage: vidStorage })
module.exports = { upload, uploadVideo }