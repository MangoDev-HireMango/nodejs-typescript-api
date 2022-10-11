export default {
  ErrorResponse: {
    type: 'object',
    required: ['status', 'message'],
    properties: {
      status: {
        type: 'integer',
        format: 'int32',
      },
      message: {
        type: 'string',
      },
    },
  },
  ValidationResponse: {
    type: 'object',
    required: ['status', 'message'],
    properties: {
      status: {
        type: 'integer',
        format: 'int32',
        example: 400,
      },
      message: {
        type: 'string',
        example: 'Error Message',
      },
      errors: {
        type: 'object',
        properties: {
          key1: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                example: 'key1',
              },
              message: {
                type: 'string',
                example: 'Key 1 is required',
              },
            },
          },
          key2: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                example: 'key1',
              },
              message: {
                type: 'string',
                example: 'Key 1 is required',
              },
            },
          },
        },
      },
    },
  },
  unauthorizedAccess: {
    type: 'object',
    required: ['status', 'message'],
    properties: {
      status: {
        type: 'integer',
        format: 'int32',
        example: 401,
      },
      message: {
        type: 'string',
        example: 'Forbidden access',
      },
    },
  },
  notExists: {
    type: 'object',
    required: ['status', 'message'],
    properties: {
      status: {
        type: 'integer',
        format: 'int32',
        example: 404,
      },
      message: {
        type: 'string',
        example: 'record does not exists',
      },
    },
  },
  UpdateUserProfileConflict: {
    type: 'object',
    required: ['status', 'errors'],
    properties: {
      status: {
        type: 'integer',
        format: 'int32',
        example: 409,
      },
      errors: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            example: 'Email is already in use',
          },
          username: {
            type: 'string',
            example: 'username is already taken',
          },
          phoneNumber: {
            type: 'string',
            example: 'Phone number is already in use',
          },
        },
      },
    },
  },

  ConflictResponse: {
    type: 'object',
    required: ['status', 'message'],
    properties: {
      status: {
        type: 'integer',
        format: 'int32',
        example: 409,
      },
      message: {
        type: 'string',
        example: 'record already exists',
      },
    },
  },
};
