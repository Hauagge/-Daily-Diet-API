import { prisma } from '@/database/prismaClient';
import { IMealRepository } from './IMealRepository';
import { Prisma, Meal } from '@prisma/client';

export class MealRepository implements IMealRepository {
    async create({
        name,
        description,
        isFitness,
        dateAndHour,
        userId,
    }: Prisma.MealUncheckedCreateInput): Promise<Meal> {
        return await prisma.meal.create({
            data: {
                userId,
                name,
                description,
                isFitness,
                dateAndHour,
            },
        });
    }
    async findById(id: string): Promise<Meal | null> {
        return await prisma.meal.findUnique({
            where: {
                id,
            },
        });
    }

    async update({
        id,
        name,
        description,
        isFitness,
        dateAndHour,
    }: Prisma.MealUncheckedUpdateInput): Promise<Meal> {
        return await prisma.meal.update({
            where: {
                id: id as string,
            },
            data: {
                name,
                description,
                isFitness,
                dateAndHour,
            },
        });
    }

    async delete(id: string): Promise<Meal> {
        return await prisma.meal.delete({
            where: {
                id: id,
            },
        });
    }
}
