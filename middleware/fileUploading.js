const multer = require('multer');
const path = require('path');
// const SHA1_Function = require("crypto-js/sha1");
const MD5_Function = require("crypto-js/md5");

const HexStrategy = require('crypto-js').enc.Hex;

const imageFilter = function (req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images are allowed!'), false);
    }

    cb(null, true);
  };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let savingFolder;

        const categoryRegex = /^\/categories(?:\/.*)?$/;
        const productsRegex = /^\/products(?:\/.*)?$/;

        // [x] BUG: There is a problem regarding uploading images with "weird" file-names.
        // BUG: On Linux the paths work one way, on Windows they work a certain way
        // if (categoryRegex.test(req.url)) {
        //     savingFolder = "public\\\\uploads\\\\categories";
        // } else if (productsRegex.test(req.url)) {
        //     savingFolder = "public\\\\uploads\\\\products";
        // } else {
        //     savingFolder = "public\\\\uploads\\\\misc";
        // }

        if (categoryRegex.test(req.url)) {
            savingFolder = path.join(__dirname, '..', 'public', 'uploads', 'categories');
        } else if (productsRegex.test(req.url)) {
            savingFolder = path.join(__dirname, '..', 'public', 'uploads', 'products');
        } else {
            savingFolder = path.join(__dirname, '..', 'public', 'uploads', 'misc');
        }

        cb(null, savingFolder);
    },
    filename: function (req, file, cb) {
        const dateNow = new Date();
        const ext = path.extname(file.originalname);
        const filename = path.basename(file.originalname, ext);
        const hashFN = MD5_Function(`${filename}${dateNow.getTime()}`).toString(HexStrategy);
        const hashFNwExt = `${hashFN}${ext}`;
        cb(null, hashFNwExt);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: imageFilter
});

module.exports = {
    upload
};