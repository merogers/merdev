import sharp from 'sharp';
import createError from 'http-errors';
import { BlobServiceClient } from '@azure/storage-blob';
import logger from '../util/logger.util.js';
import generateFileName from '../util/file.util.js';

const AZURE_BLOB_STRING = process.env.AZURE_BLOB_STRING;
const AZURE_BLOB_CONTAINER = process.env.AZURE_BLOB_CONTAINER;

export const handleImageUpload = async (req, res, next) => {
  const file = req.file;

  // Create the BlobServiceClient object with connection string
  try {
    const buffer = await sharp(file.buffer)
      .resize({ height: 720, width: 1280, fit: 'contain' })
      .jpeg({ mozjpeg: true })
      .toBuffer();

    // Get Azure details
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_BLOB_STRING);
    const containerClient = blobServiceClient.getContainerClient(AZURE_BLOB_CONTAINER);

    // Upload File to Azure Container
    const blobName = `${generateFileName()}.jpg`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(buffer, { conditions: { ifNoneMatch: '*' } });

    logger.info(`Screenshot Uploaded: ${blockBlobClient.url}`);
    return res.status(200).json({ screenshot: blockBlobClient.url });
  } catch (error) {
    next(error);
    return null;
  }
};

export const handleImageDelete = async (req, res, next) => {
  const { filename } = req.params;
  try {
    // Get Azure details
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_BLOB_STRING);
    const containerClient = blobServiceClient.getContainerClient(AZURE_BLOB_CONTAINER);

    const blobClient = containerClient.getBlobClient(filename);
    const exists = await blobClient.exists();

    if (exists === false) {
      return next(createError(404, 'Screenshot does not exist'));
    }

    await blobClient.delete();

    return res.sendStatus(200);
  } catch (error) {
    next(error);
    return null;
  }
};
