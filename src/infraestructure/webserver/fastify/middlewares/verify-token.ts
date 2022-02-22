import { FastifyReply, FastifyRequest } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ErrorCodes } from '../../../../domain/shared/custom-error';

// eslint-disable-next-line require-await
export const verifyToken = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const token = request.headers.authorization;

  if (!token) {
    reply.status(ErrorCodes.UNAUTHORIZED).send({ message: 'Unauthorized' });

    return;
  }

  const { payload }: JwtPayload = <JwtPayload>jwt.verify(token, <string>process.env.JWT_SECRET, { complete: true });

  request.locals = {
    userId: payload.userId,
    email: payload.email,
  };
};
