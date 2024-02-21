import sharp from 'sharp';
import generateFileName from '../util/file';
import { uploadFile } from '../util/s3';

const uploadImage = async (req, res, _next) => {
  try {
    const file = req.file;
    const buffer = await sharp(file.buffer)
      .resize({ height: 720, width: 1280, fit: 'contain' })
      .jpeg({ mozjpeg: true })
      .toBuffer();

    const newName = `${generateFileName()}.jpg`;

    await uploadFile(buffer, newName, file.mimetype);
    res.status(200).json({ message: 'success', filename: newName });
  } catch (error) {
    res.sendStatus(500);
  }
};

export default uploadImage;
