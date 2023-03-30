import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UserRepository } from '../../repository/User/UserRepository';
import { CreateUserUseCase } from '../../useCases/User/CreateUserUseCase';

export async function createUserController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = authenticateBodySchema.parse(
        request.body
    );

    try {
        const usersRepository = new UserRepository();

        const createUserUseCase = new CreateUserUseCase(usersRepository);

        const { user } = await createUserUseCase.execute({
            name,
            email,
            password,
        });

        return reply.status(200).send({
            user,
        });
    } catch (err: any) {
        return reply.status(400).send({ message: err.message });
    }
}
