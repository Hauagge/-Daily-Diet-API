import { authenticateController } from '@/controller/User/AuthenticateUserController';
import { FastifyInstance } from 'fastify';
import { createUserController } from '../controller/User/CreateUserController';

export async function userRoutes(app: FastifyInstance, options: any) {
    app.post('/user', createUserController);

    app.post('/sessions', authenticateController);
}
