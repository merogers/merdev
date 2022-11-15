const { Storage } = require('@google-cloud/storage');
const asyncHandler = require('express-async-handler');

// DESC:    Post Screenshot to Google Cloud
// ROUTE:   POST with FILE to /api/image/upload
// ACCESS:  Private
const uploadImage = asyncHandler(async (req, res) => {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.KEYFILE_NAME,
  });

  const bucket = storage.bucket(process.env.BUCKET);

  if (req.file) {
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('finish', () => {
      res.status(201).json({
        message: 'Uploaded successfully',
        publicUrl: process.env.STORAGE_URL + blob.metadata.name,
      });
    });
    blobStream.end(req.file.buffer);
  } else {
    res.status(500);
    throw new Error('Error uploading image');
  }
});

module.exports = { uploadImage };
