import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { MealRepository } from '../../repository/Meal/MealRepository';
import { GetMetricMealsUseCase } from '../../useCases/Meal/GetMetricsMealsUseCase';

async function getMetricsMealsController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const userId = request.user.sub;
    try {
        const mealRepository = new MealRepository();

        const getMetricsMealUseCase = new GetMetricMealsUseCase(mealRepository);
        const {
            totalQuantityMeal,
            totalQuantityMealOnDiet,
            totalQuantityMealOutDiet,
        } = await getMetricsMealUseCase.execute(userId);

        return reply.status(200).send({
            totalQuantityMeal,
            totalQuantityMealOnDiet,
            totalQuantityMealOutDiet,
        });
    } catch (err: any) {
        return reply.status(400).send({ message: err.message });
    }
}

export { getMetricsMealsController };
