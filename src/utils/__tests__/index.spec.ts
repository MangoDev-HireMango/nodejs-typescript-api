/* eslint-disable require-jsdoc */
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import { uploadFile } from '@utils/s3';

jest.mock('fs');
fs.createReadStream = jest.fn().mockReturnValue(null);
jest.mock('aws-sdk', () => {
  class mockS3 {
    upload: () => void;

    constructor() {
      this.upload = jest
        .fn()
        .mockImplementation((file: AWS.S3.PutObjectRequest, callback: (arg1: unknown, arg2: { Key: string }) => void) =>
          callback(null, { Key: file.Key }),
        );
    }
  }

  return {
    config: {
      update: jest.fn(),
    },
    S3: mockS3,
  };
});
describe('TEST UTILS', () => {
  it('Should be able to upload a file', async () => {
    const result = await uploadFile({
      tempFilePath: 'test_url',
      name: 'image.jpg',
    } as UploadedFile);

    expect(result.Key).toBe('image.jpg');
  });
});
