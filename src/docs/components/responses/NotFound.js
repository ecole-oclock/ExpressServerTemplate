export default {
  NotFound: {
    description: 'Page introuvable', // response desc.
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/NotFound', // Todo model
        },
      },
    },
  },
};
