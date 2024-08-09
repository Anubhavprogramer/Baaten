const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// diskStorage is a function that takes an object as an argument
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return cb(err);
            }
            cb(null, buf.toString('hex') + path.extname(file.originalname));
        });
    }
  })
  
  const upload = multer({ storage: storage })


// export the  upload variable

module.exports = upload;