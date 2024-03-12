import sharp from 'sharp';
import createError from 'http-errors';
import { PutObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import generateFileName from '../util/file.util.js';

const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET = process.env.AWS_BUCKET;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

export const handleImageUpload = async (req, res, next) => {
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
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    const uploadFile = async (fileBuffer, fileName, mimetype) => {
      const uploadParams = {
        Bucket: AWS_BUCKET,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,
      };

      return await client.send(new PutObjectCommand(uploadParams));
    };

    await uploadFile(buffer, newName, file.mimetype);
    res.status(200).json({ filename: newName });
  } catch (error) {
    next(error);
    return null;
  }
};

export const handleImageDelete = async (req, res, next) => {
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
