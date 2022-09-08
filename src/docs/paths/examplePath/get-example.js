export default {
  // method of operation
  get: {
    tags: ['ExampleTag'], // operation's tag.
    description: 'Get Example', // operation's desc.
    operationId: 'getExample', // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: 'Exemple de retour', // response desc.
        content: {
          // content-type
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ExampleSchema',
              },
            },
          },
        },
      },
    },
  },
};
