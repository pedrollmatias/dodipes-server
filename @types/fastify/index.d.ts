import { FastifyRequest } from 'fastify';

interface ILocals {
  userId: string;
  email: string;
}

declare module 'fastify' {
  export interface FastifyRequest<> {
    locals: ILocals;
  }
}
