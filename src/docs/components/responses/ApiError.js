export default {
  ApiError: {
    description: 'Une erreur est survenue', // response desc.
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ApiError', // Todo model
        },
      },
    },
  },
};
