import ExtendableError from './ExtendableError';

export default {
  NotFound: {
    type: 'object', // data type
    properties: {
      ...ExtendableError,
      name: {
        type: 'string', // data type
        example: 'APIError',
      },
      message: {
        type: 'string', // data type
        example: 'Not found',
      },
      status: {
        type: 'integer', // data type
        example: 404,
      },
    },
  },
};
