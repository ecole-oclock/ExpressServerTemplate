export default {
  ExampleSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        readOnly: true,
      },
      username: {
        type: 'string',
        readOnly: true,
      },
      email: {
        type: 'string',
        format: 'email',
        readOnly: true,
      },
      date_created: {
        type: 'object',
        readOnly: true,
        properties: {
          date: {
            type: 'string',
          },
          timezone_type: {
            type: 'integer',
          },
          timezone: {
            type: 'string',
          },
        },
      },
      date_modified: {
        type: 'object',
        readOnly: true,
        properties: {
          date: {
            type: 'string',
          },
          timezone_type: {
            type: 'integer',
          },
          timezone: {
            type: 'string',
          },
        },
      },
      profile: {
        type: 'object',
        readOnly: true,
        properties: {
          firstname: {
            type: 'string',
          },
          lastname: {
            type: 'string',
          },
          bio: {
            type: 'string',
          },
          country: {
            type: 'string',
          },
          birthdate: {
            type: 'object',
            properties: {
              date: {
                type: 'string',
              },
              timezone_type: {
                type: 'integer',
              },
              timezone: {
                type: 'string',
              },
            },
          },
          gender: {
            type: 'string',
          },
          facebook: {
            type: 'string',
            format: 'uri',
          },
          twitter: {
            type: 'string',
          },
          github: {
            type: 'string',
          },
          vpn_name: {
            type: 'string',
          },
          vm_name: {
            type: 'string',
          },
          discord: {
            type: 'string',
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
        },
      },
      is_student: {
        type: 'boolean',
        readOnly: true,
      },
      is_teacher: {
        type: 'boolean',
        readOnly: true,
      },
      is_admin: {
        type: 'boolean',
        readOnly: true,
      },
      roles: {
        type: 'array',
        readOnly: true,
        items: {
          type: 'string',
        },
      },
      cohorts: {
        type: 'array',
        readOnly: true,
        items: {
          type: 'integer',
        },
      },
      jwt: {
        type: 'object',
        readOnly: true,
        properties: {
          jwtToken: {
            type: 'string',
          },
          xsrfToken: {
            type: 'string',
            format: 'uuid',
          },
        },
      },
    },
  },
};
