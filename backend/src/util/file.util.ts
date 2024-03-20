import crypto from 'crypto';

const generateFileName = (bytes = 16): string => crypto.randomBytes(bytes).toString('hex');

export default generateFileName;
