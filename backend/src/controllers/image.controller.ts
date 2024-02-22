import type { Response, NextFunction } from 'express';
import sharp from 'sharp';
import createError from 'http-errors';

import generateFileName from '../util/file.util';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { env } from '../config/env.config';

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

    const client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const uploadFile = async (fileBuffer: any, fileName: any, mimetype: any) => {
      const uploadParams = {
        Bucket: env.AWS_BUCKET,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,
      };

      return await client.send(new PutObjectCommand(uploadParams));
    };

    await uploadFile(buffer, newName, file.mimetype);
    res.status(200).json({ filename: newName });
  } catch (error) {
    res.sendStatus(500);
  }
};

export default handleUploadImage;
