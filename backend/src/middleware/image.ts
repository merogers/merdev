import multer from 'multer';
import type { RequestHandler } from 'express';

// into the void
const fileFilter = (_req, file, cb): void => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};

const storage = multer.memoryStorage();

// Use memory and limit uploads to 5MB
const upload: RequestHandler = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
