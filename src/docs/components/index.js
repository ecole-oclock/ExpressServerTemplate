import ExampleSchema from './ExampleSchema';
import errors from './errors';
import securitySchemes from './securitySchemes';
import responses from './responses';

export default {
  components: {
    securitySchemes,
    responses,
    schemas: {
      ...ExampleSchema,
      ...errors,
    },
  },
};
