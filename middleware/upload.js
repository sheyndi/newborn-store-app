import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './src/public/images/products');
    },
    
    filename: (req, file, cb) =>{
        cb(null, Date.now());
    }
});


const upload = multer({
    storage
});

export default upload;
