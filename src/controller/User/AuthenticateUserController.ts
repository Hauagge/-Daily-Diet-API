import { UserRepository } from '@/repository/User/UserRepository';
import { AuthenticateUseCase } from '@/useCases/User/AuthenticateUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticateController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const usersRepository = new UserRepository();
        const authenticateUseCase = new AuthenticateUseCase(usersRepository);

        const { user } = await authenticateUseCase.execute({
            email,
            password,
        });

        const token = await reply.jwtSign({
            sub: user.id,
        });

        return reply.status(200).send({
            token,
        });
    } catch (err: any) {
        return reply.status(400).send({ message: err.message });
    }
}
