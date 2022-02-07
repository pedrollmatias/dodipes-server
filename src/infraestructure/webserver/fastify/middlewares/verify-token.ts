import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { ErrorCodes } from '../../../../domain/shared/custom-error';

// eslint-disable-next-line require-await
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const token = request.headers.authorization;

  if (!token) {
    reply.status(ErrorCodes.UNAUTHORIZED).send({ message: 'Unauthorized' });

    return;
  }

  jwt.verify(token, <string>process.env.JWT_SECRET);
};
