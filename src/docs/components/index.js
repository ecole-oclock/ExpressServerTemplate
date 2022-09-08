import ExampleSchema from './ExampleSchema';
import errors from './errors';
import securitySchemes from './securitySchemes';
import responses from './responses';

module.exports = {
  components: {
    securitySchemes,
    responses,
    schemas: {
      ...ExampleSchema,
      ...errors,
    },
  },
};
