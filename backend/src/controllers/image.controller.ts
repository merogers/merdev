import sharp from 'sharp';
import createError from 'http-errors';
import { PutObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import generateFileName from '../util/file.util';

import type { Request, Response, NextFunction } from 'express';
import type { PutObjectAclCommandOutput } from '@aws-sdk/client-s3';

export const handleImageUpload = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const AWS_REGION = process.env.AWS_REGION;
  const AWS_BUCKET = process.env.AWS_BUCKET;
  const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
  const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

  if (
    AWS_REGION === undefined ||
    AWS_BUCKET === undefined ||
    AWS_ACCESS_KEY_ID === undefined ||
    AWS_SECRET_ACCESS_KEY === undefined
  ) {
    throw createError(500, 'AWS environment variables missing');
  }

  try {
    const file: Express.Multer.File | undefined = req.file;

    if (file === null) {
      throw createError(400, 'No image specified');
    }
    const buffer = await sharp(file?.buffer)
      .resize({ height: 720, width: 1280, fit: 'contain' })
      .jpeg({ mozjpeg: true })
      .toBuffer();

    const newName = `${generateFileName()}.jpg`;

    const client = new S3Client({
      region: AWS_REGION,
      credentials: {
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        accessKeyId: AWS_ACCESS_KEY_ID,
      },
    });

    const uploadFile = async (
      fileBuffer: any,
      fileName: string,
      mimetype: string | undefined,
    ): Promise<PutObjectAclCommandOutput> => {
      const uploadParams = {
        Bucket: AWS_BUCKET,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,
      };

      return await client.send(new PutObjectCommand(uploadParams));
    };

    await uploadFile(buffer, newName, file?.mimetype);
    return res.status(200).json({ filename: newName });
  } catch (error) {
    next(error);
    return null;
  }
};

export const handleImageDelete = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { filename } = req.params;

  const AWS_REGION = process.env.AWS_REGION;
  const AWS_BUCKET = process.env.AWS_BUCKET;
  const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
  const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

  if (
    AWS_REGION === undefined ||
    AWS_BUCKET === undefined ||
    AWS_ACCESS_KEY_ID === undefined ||
    AWS_SECRET_ACCESS_KEY === undefined
  ) {
    throw createError(500, 'AWS environment variables missing');
  }

  try {
    const client = new S3Client({
      region: AWS_REGION,
      credentials: {
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        accessKeyId: AWS_ACCESS_KEY_ID,
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
  }
};
