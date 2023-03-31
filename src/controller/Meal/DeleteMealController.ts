import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { MealRepository } from '../../repository/Meal/MealRepository';
import { DeleteMealUseCase } from '../../useCases/Meal/DeleteMealUseCase';

export async function updateMealController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        mealId: z.string(),
        name: z.string().optional(),
        isFitness: z.boolean().optional(),
        description: z.string().optional(),
        dateAndHour: z.string().optional(),
    });

    const userId = request.user.sub;
    const { mealId } = authenticateBodySchema.parse(request.params);

    try {
        const mealRepository = new MealRepository();

        const deleteMealUseCase = new DeleteMealUseCase(mealRepository);
        const { meal } = await deleteMealUseCase.execute({
            userId,
            id: mealId,
        });

        return reply.status(200).send({
            meal,
        });
    } catch (err: any) {
        return reply.status(400).send({ message: err.message });
    }
}
