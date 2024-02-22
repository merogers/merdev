import sharp from 'sharp';
import type { Request, Response, NextFunction } from 'express';
import generateFileName from '../util/file.util';
import { uploadFile } from '../util/s3.util';
import createError from 'http-errors';

// interface UploadRequest extends Request {
//   file?: {
//     mimetype: string;
//     originalname: string;
//     buffer: Buffer;
//   };
// }

// TODO: Fix any
const handleUploadImage = async (req: any, res: Response, _next: NextFunction) => {
  try {
    const file = req.file;

    if (file === null) {
      createError(404, 'No Image');
      return;
    }
    const buffer = await sharp(file.buffer)
      .resize({ height: 720, width: 1280, fit: 'contain' })
      .jpeg({ mozjpeg: true })
      .toBuffer();

    const newName = `${generateFileName()}.jpg`;

    await uploadFile(buffer, newName, file.mimetype);
    res.status(200).json({ filename: newName });
  } catch (error) {
    res.sendStatus(500);
  }
};

export default handleUploadImage;
