/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from "fastify";
import { RegisterUser } from "../../../../application/use-cases/user/register-user.use-case";
import {
  IRegisterUserInput,
  RegisterUserController,
} from "../../../../interfaces/controllers/register-user.controller";
import {
  IRegisterUserOutput,
  RegisterUserPresenter,
} from "../../../../interfaces/presenters/register-user.presenter";
import { MongodbUserRepository } from "../../../repositories/mongodb/mongodb-user-repository";
import { PasswordHasher } from "../../../security/password-hasher";
import schema from "./register-user.schema";

export default async (server: FastifyInstance): Promise<void> => {
  server.post<{
    Body: IRegisterUserInput;
    Reply: IRegisterUserOutput;
  }>(
    "/user/registration",
    { schema },
    async (request, reply): Promise<void> => {
      const mongodbUserRepository = new MongodbUserRepository();
      const passwordHasher = new PasswordHasher();

      const controller = new RegisterUserController(passwordHasher.hash);
      const contorllerInput = request;
      const controllerOutput = await controller.handle(contorllerInput);

      const useCase = new RegisterUser(mongodbUserRepository);
      const userCaseInput = controllerOutput;
      const useCaseOutput = await useCase.handle(userCaseInput);

      const presenter = new RegisterUserPresenter();
      const presenterInput = useCaseOutput;
      const presenterOutput = presenter.handle(presenterInput);

      reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
    }
  );
};
