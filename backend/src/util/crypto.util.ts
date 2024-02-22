import crypto from 'crypto';

export const randomString = () => crypto.randomBytes(128).toString('base64');

export const hashString = (salt: string, password: string, secret: string) => {
  const hash = crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('hex');
  return hash;
};
