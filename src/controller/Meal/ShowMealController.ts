import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { MealRepository } from '../../repository/Meal/MealRepository';
import { ShowMealUseCase } from '../../useCases/Meal/ShowMealUseCase';

async function showMealController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        mealId: z.string(),
    });
    const userId = request.user.sub;
    const { mealId } = authenticateBodySchema.parse(request.params);

    try {
        const mealRepository = new MealRepository();

        const showMealUseCase = new ShowMealUseCase(mealRepository);
        const { meal } = await showMealUseCase.execute({
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

export { showMealController };
