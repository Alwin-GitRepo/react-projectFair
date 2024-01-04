const multer = require('multer')

// to store multer data
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    // create a new filename
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

// filter
const fileFilter = (req,file,callback)=>{
    if(file.mimetype === 'image/png' ||
     file.mimetype === 'image/jpg' || 
     file.mimetype === 'image/jpeg'){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error('Invalid file type...... must be png,jpg or jpeg'))
    }
}

const multerConfig = multer({
    storage,fileFilter
})

module.exports = {multerConfig}