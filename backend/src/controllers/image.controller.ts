import sharp from 'sharp';
import createError from 'http-errors';
import { PutObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import generateFileName from '../util/file.util';
import { Request, Response, NextFunction } from 'express';

// AWS Config
const AWS_REGION = process.env.AWS_REGION as string;
const AWS_BUCKET = process.env.AWS_BUCKET as string;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;

export const handleImageUpload = async (req: any, res: Response, next: NextFunction) => {
  try {
    const file = req.file;

    if (file === null) {
      return next(createError(400, 'No image specified'));
    }
    const buffer = await sharp(file?.buffer)
      .resize({ height: 720, width: 1280, fit: 'contain' })
      .jpeg({ mozjpeg: true })
      .toBuffer();

    const newName = `${generateFileName()}.jpg`;

    const client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    const uploadFile = async (fileBuffer: any, fileName: string, mimetype: any) => {
      const uploadParams = {
        Bucket: AWS_BUCKET,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,
      };

      return await client.send(new PutObjectCommand(uploadParams));
    };

    await uploadFile(buffer, newName, file?.mimetype);
    res.status(200).json({ filename: newName });
  } catch (error) {
    next(error);
    return null;
  }
};

export const handleImageDelete = async (req: any, res: Response, next: NextFunction) => {
  const { filename } = req.params;
  try {
    const client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    const input = {
      Bucket: AWS_BUCKET,
      Key: filename,
    };

    const command = new DeleteObjectCommand(input);
    await client.send(command);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
    return null;
  }
};
