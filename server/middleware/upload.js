import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/products');
    },
    filename: (req, file, cb) => {
        const imgName = Date.now().toString() + '.' + file.originalname.split('.').pop();
        cb(null, imgName);
    }
});


const upload = multer({
    storage
});

export default upload;
