export default {
  ApiError: {
    type: 'object', // data type
    properties: {
      name: {
        type: 'string', // data type
        example: 'APIError',
      },
      message: {
        type: 'string', // data type
        example: "Détail de l'erreur variable",
      },
      status: {
        type: 'integer', // data type
        example: 500,
      },
    },
  },
};
