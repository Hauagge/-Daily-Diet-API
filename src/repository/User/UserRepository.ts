import { prisma } from '@/database/prismaClient';
import { IUserRepository } from './IUserRepository';
import { Prisma, User } from '@prisma/client';

export class UserRepository implements IUserRepository {
    async create({
        name,
        email,
        password,
    }: Prisma.UserCreateInput): Promise<User> {
        return await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
    }
    async findById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive',
                },
            },
        });
    }
}
