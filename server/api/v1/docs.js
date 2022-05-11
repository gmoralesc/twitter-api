module.exports = {
  swagger: '2.0',
  info: {
    title: 'Twitter API',
    version: '1.0.0',
  },
  paths: {
    '/api/tweets': {
      get: {
        description: 'Get all Tweets',
        produces: ['application/json'],
        parameters: [
          {
            name: 'skip',
            in: 'path',
            description: 'Number of records to skip',
            required: false,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'limit',
            in: 'path',
            description: 'Number of records to limit',
            required: false,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Tweet',
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    Tweet: {
      type: 'object',
      required: ['content'],
      properties: {
        id: {
          type: 'string',
        },
        content: {
          type: 'string',
        },
        likes: {
          type: 'integer',
        },
        userId: {
          type: 'string',
        },
        createdAt: {
          type: 'string',
        },
        updatedAt: {
          type: 'string',
        },
      },
    },
  },
};
