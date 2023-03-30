import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { env } from './env';
import cookie from '@fastify/cookie';
import { userRoutes } from './routes/user.routes';

const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '1h',
    },
});
app.register(cookie);
app.register(userRoutes);

app.listen({ port: 3333 }).then(() => {
    console.log(`Server listening at 3333`);
});
