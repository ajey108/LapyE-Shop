import multer from 'multer';
const storage = multer.diskStorage({
    
        filename: function (req, file, callback) {
            //store uploded file with its original name
            callback(null, file.originalname)
        },
    })
    
    const upload = multer({ storage: storage })
    export default upload