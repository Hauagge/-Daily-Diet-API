import { verifyJwt } from '@/middlewares/check-sessions-id-exists';
import { FastifyInstance } from 'fastify';
import { createMealController } from '../controller/Meal/CreateMealController';
import { updateMealController } from '../controller/Meal/UpdateMealController';
import { deleteMealController } from '../controller/Meal/DeleteMealController';
import { showMealController } from '../controller/Meal/ShowMealController';
import { getMetricsMealsController } from '../controller/Meal/GetMetricsMealsController';
import { listMealsController } from '../controller/Meal/ListMealsController';

export async function MealRoutes(app: FastifyInstance, options: any) {
    app.post('/meals', { onRequest: [verifyJwt] }, createMealController);
    app.put('/meals', { onRequest: [verifyJwt] }, updateMealController);
    app.delete('/meals', { onRequest: [verifyJwt] }, deleteMealController);
    app.get('/meals/:mealId', { onRequest: [verifyJwt] }, showMealController);
    app.get('/meals', { onRequest: [verifyJwt] }, listMealsController);
    app.get(
        '/meals/metrics',
        { onRequest: [verifyJwt] },
        getMetricsMealsController
    );
}
