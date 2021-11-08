const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "master-dev-app",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file);
    },
  }),
});

// exports.setProfilePic = (req, res, next) => {
//   console.log(req.files);
//   const uploadSingle = upload().single("image-upload");

//   uploadSingle(req, res, error => {
//       if(err) return res.status(400).json({message: err.message});

//       console.log(req.files)

//       res.json(200).json({data: req.files})
//   })
// };

module.exports = upload;

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
//     }
//   };
