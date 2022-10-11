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
        .mockImplementation((_filePath: string, callback: (arg1: unknown) => void) =>
          callback(new Error('Failed to upload')),
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
  it('Should throw an exception when a file can not be uploaded', async () => {
    try {
      await uploadFile({ tempFilePath: 'test_url' } as UploadedFile);
    } catch (error: unknown) {
      expect((error as Error).message as string).toBe('Failed to upload');
    }
  });
});
