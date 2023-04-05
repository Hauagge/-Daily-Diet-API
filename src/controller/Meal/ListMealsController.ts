import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { MealRepository } from '../../repository/Meal/MealRepository';
import { ListMealsUseCase } from '../../useCases/Meal/ListMealsUseCase';

async function listMealsController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        mealId: z.string(),
    });
    const userId = request.user.sub;

    try {
        const mealRepository = new MealRepository();

        const listAllMealUseCase = new ListMealsUseCase(mealRepository);
        const { meal } = await listAllMealUseCase.execute(userId);

        return reply.status(200).send({
            meal,
        });
    } catch (err: any) {
        return reply.status(400).send({ message: err.message });
    }
}

export { listMealsController };
