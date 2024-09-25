const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const stream = require('stream');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    bufferStream.pipe(cloudinary.uploader.upload_stream({ 
      folder: 'profile_pictures', 
      allowed_formats: ['jpg', 'png', 'jpeg'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }] 
    }, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    }));
  });
};

module.exports = { cloudinary, upload, uploadToCloudinary };
