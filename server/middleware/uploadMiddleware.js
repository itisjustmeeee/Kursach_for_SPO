import multer from "multer"
import path from "path"
import fs from "fs"

const uploadDir = path.join(process.cwd(), "uploads")

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true})
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const allowed = ['application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/png',
        'image/jpeg'
    ]

    if (allowed.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type'), false)
    }
}

export const upload = multer({storage, fileFilter, limits: {fileSize: 10 * 1024 * 1024}})