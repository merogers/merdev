import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { env } from '../config/env.config';

const client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadFile(fileBuffer: any, fileName: any, mimetype: any) {
  const uploadParams = {
    Bucket: env.AWS_BUCKET,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
  };

  return await client.send(new PutObjectCommand(uploadParams));
}
