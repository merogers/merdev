import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadFile(fileBuffer, fileName, mimetype) {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
  };

  return await client.send(new PutObjectCommand(uploadParams));
}
