import AWS from 'aws-sdk';

const s3 = new AWS.S3();

s3.putObject({
  Body: 'hello world',
  Bucket: 'personal-site-uploads',
  Key: 'test.txt',
});
