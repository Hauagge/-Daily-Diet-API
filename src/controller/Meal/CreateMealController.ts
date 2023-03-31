import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { MealRepository } from '../../repository/Meal/MealRepository';
import { CreateMealUseCase } from '../../useCases/Meal/CreateMealUseCase';

export async function createMealController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        name: z.string(),
        isFitness: z.boolean(),
        description: z.string(),
        dateAndHour: z.string(),
    });

    const { name, description, isFitness, dateAndHour } =
        authenticateBodySchema.parse(request.body);

    try {
        const mealRepository = new MealRepository();

        const createMealUseCase = new CreateMealUseCase(mealRepository);

        const { meal } = await createMealUseCase.execute({
            name,
            description,
            isFitness,
            dateAndHour: new Date(dateAndHour),
            userId: request.user.sub,
        });

        return reply.status(200).send({
            meal,
        });
    } catch (err: any) {
        return reply.status(400).send({ message: err.message });
    }
}
