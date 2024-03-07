import Multer from 'multer';

// Use memory and limit uploads to 5MB
export const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
