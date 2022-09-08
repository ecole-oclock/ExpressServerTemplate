import ExtendableError from './ExtendableError';

export default {
  BadRequest: {
    type: 'object', // data type
    properties: {
      ...ExtendableError,
      name: {
        type: 'string', // data type
        example: 'BadRequest',
      },
      status: {
        type: 'integer', // data type
        example: 400,
      },
    },
  },
};
