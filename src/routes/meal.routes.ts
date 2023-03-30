import { verifyJwt } from '@/middlewares/check-sessions-id-exists';
import { FastifyInstance } from 'fastify';
import { createMealController } from '../controller/Meal/CreateMealController';

export async function MealRoutes(app: FastifyInstance, options: any) {
    app.post('/Meal', { onRequest: [verifyJwt] }, createMealController);
}
