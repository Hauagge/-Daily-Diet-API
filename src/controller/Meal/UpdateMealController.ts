import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { MealRepository } from '../../repository/Meal/MealRepository';
import { UpdateMealUseCase } from '../../useCases/Meal/UpdateMealUseCase';

export async function createMealController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        mealId: z.string(),
        name: z.string(),
        isFitness: z.boolean(),
        description: z.string(),
        dateAndHour: z.date(),
    });

    const { mealId, name, description, isFitness, dateAndHour } =
        authenticateBodySchema.parse(request.body);

    try {
        const mealRepository = new MealRepository();

        const updateMealUseCase = new UpdateMealUseCase(mealRepository);

        const { meal } = await updateMealUseCase.execute({
            id: mealId,
            name,
            description,
            isFitness,
            dateAndHour,
            userId: request.user.sub,
        });

        return reply.status(200).send({
            meal,
        });
    } catch (err: any) {
        return reply.status(400).send({ message: err.message });
    }
}
