import { IDomainStore } from '../../../domain/entities/store/store.types';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<IDomainStore[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
      },
      address: {
        type: 'object',
        properties: {
          street: {
            type: 'string',
          },
          number: {
            type: 'string',
          },
          complement: {
            type: 'string',
            nullable: true,
          },
          neighborhood: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
          state: {
            type: 'string',
          },
          zipCode: {
            type: 'string',
          },
        },
        required: ['city', 'neighborhood', 'number', 'state', 'street', 'zipCode'],
      },
      categories: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
            },
            active: {
              type: 'boolean',
              nullable: true,
            },
            createdAt: {
              type: 'object',
              nullable: true,
              required: [],
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                  },
                  active: {
                    type: 'boolean',
                    nullable: true,
                  },
                  createdAt: {
                    required: [],
                    type: 'object',
                  },
                  description: {
                    type: 'string',
                    nullable: true,
                  },
                  media: {
                    type: 'object',
                    nullable: true,
                    required: [],
                  },
                  modifiedAt: {
                    type: 'object',
                    nullable: true,
                    required: [],
                  },
                  name: {
                    type: 'string',
                  },
                  price: {
                    type: 'integer',
                  },
                },
                required: ['_id', 'createdAt', 'name', 'price'],
              },
            },
            modifiedAt: {
              type: 'object',
              nullable: true,
              required: [],
            },
            name: {
              type: 'string',
            },
          },
          required: ['_id', 'items', 'name'],
        },
        nullable: true,
      },
      createdAt: {
        type: 'object',
        required: [],
      },
      media: {
        type: 'object',
        nullable: true,
        properties: {
          coverPhoto: {
            nullable: true,
            type: 'object',
            required: [],
          },
          logo: {
            type: 'object',
            nullable: true,
            required: [],
          },
        },
      },
      modifiedAt: {
        type: 'object',
        nullable: true,
        required: [],
      },
      name: {
        type: 'string',
      },
      storename: {
        type: 'string',
      },
      users: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
            },
            insertedAt: {
              type: 'object',
              required: [],
            },
            isAdmin: {
              type: 'boolean',
              nullable: true,
            },
          },
          required: ['_id', 'insertedAt'],
        },
      },
    },
    required: ['_id', 'address', 'createdAt', 'name', 'storename', 'users'],
  },
};

export default schema;
