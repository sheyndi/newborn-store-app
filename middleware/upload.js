import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/images/products');
    },

    filename: (req, file, cb) =>{
        cb(null, Date.now().toString() + '.' + file.originalname.split('.').pop());
    }
});


const upload = multer({
    storage
});

export default upload;
