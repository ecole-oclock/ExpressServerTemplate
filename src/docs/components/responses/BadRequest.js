export default {
  BadRequest: {
    description: 'Requête mal formée', // response desc.
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/BadRequest', // Todo model
        },
      },
    },
  },
};
