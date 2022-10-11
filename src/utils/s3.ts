import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';
import { UploadedFile } from 'express-fileupload';

const bucketName = String(process.env.AWS_S3_BUCKET_NAME);
const region = String(process.env.AWS_S3_BUCKET_REGION);

AWS.config.update({ region });

const s3 = new AWS.S3({
  apiVersion: 'latest',
});

export const uploadFile = (file: UploadedFile | UploadedFile[]): Promise<AWS.S3.ManagedUpload.SendData> => {
  return new Promise((resolve, reject) => {
    const fileItem = !Array.isArray(file) ? file : file[0];
    const fileStream = fs.createReadStream(fileItem.tempFilePath);

    return s3.upload({ Body: fileStream, Key: fileItem.name, Bucket: bucketName }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
      // clear tmp directory
      fs.rmSync(path.join(__dirname, '..', '..', 'tmp'), { recursive: true, force: true });
    });
  });
};
