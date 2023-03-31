import { verifyJwt } from '@/middlewares/check-sessions-id-exists';
import { FastifyInstance } from 'fastify';
import { createMealController } from '../controller/Meal/CreateMealController';
import { updateMealController } from '../controller/Meal/UpdateMealController';

export async function MealRoutes(app: FastifyInstance, options: any) {
    app.post('/meal', { onRequest: [verifyJwt] }, createMealController);
    app.put('/meal', { onRequest: [verifyJwt] }, updateMealController);
}
