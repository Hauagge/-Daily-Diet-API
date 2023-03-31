import { Prisma, Meal } from '@prisma/client';

interface IMealRepository {
    create({
        name,
        description,
        isFitness,
        dateAndHour,
        userId,
    }: Prisma.MealUncheckedCreateInput): Promise<Meal>;
    findById(id: string): Promise<Meal | null>;
    update({
        id,
        name,
        description,
        isFitness,
        dateAndHour,
    }: Prisma.MealUncheckedUpdateInput): Promise<Meal>;
    delete(id: string): Promise<Meal>;
}

export { IMealRepository };
