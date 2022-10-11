interface ISchema {
  $ref: string;
}
interface IResponseExample {
  data?: unknown;
  status?: number;
  message?: string;
}

interface IResponseValue {
  description?: string;
  schema?: ISchema;
  example?: IResponseExample;
}

interface IResponse {
  [key: number]: IResponseValue;
}

const defaultResponse: IResponse = {
  400: {
    description: 'Bad Request',
    schema: {
      $ref: '#definitions/ValidationResponse',
    },
  },
  404: {
    description: 'Bad Request',
    schema: {
      $ref: '#definitions/notExists',
    },
  },
  401: {
    description: 'Bad Request',
    schema: {
      $ref: '#definitions/unauthorizedAccess',
    },
  },
  409: {
    description: 'Bad Request',
    schema: {
      $ref: '#definitions/ConflictResponse',
    },
  },
};

export const customResponse = (response = {}): IResponse => ({
  ...defaultResponse,
  ...response,
});

export default defaultResponse;
