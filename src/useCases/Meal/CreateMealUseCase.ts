import { IMealRepository } from '../../repository/Meal/IMealRepository';
import { Prisma, Meal } from '@prisma/client';

class CreateMealUseCase {
    constructor(private mealRepository: IMealRepository) {}

    async execute({
        name,
        description,
        isFitness,
        dateAndHour,
        userId,
    }: Prisma.MealUncheckedCreateInput) {
        const meal = await this.mealRepository.create({
            name,
            description,
            isFitness,
            dateAndHour,
            userId,
        });

        return { meal };
    }
}

export { CreateMealUseCase };
