import { FastifySchema } from "fastify";

export default <FastifySchema>{
  body: {
    type: "object",
    properties: {
      username: {
        type: "string",
      },
      name: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
        },
      },
      email: {
        type: "string",
      },
      bornDate: {
        type: "string",
      },
      sex: {
        type: "string",
        emum: ["M", "F"],
      },
      password: {
        type: "string",
      },
    },
    required: ["username", "name", "email", "bornDate", "sex", "password"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        insertedId: {
          type: "string",
        },
      },
    },
  },
};
