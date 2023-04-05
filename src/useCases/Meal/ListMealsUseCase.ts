import { IMealRepository } from '../../repository/Meal/IMealRepository';
import { Prisma, Meal } from '@prisma/client';

class ListMealsUseCase {
    constructor(private mealRepository: IMealRepository) {}

    async execute(userId: string) {
        const meal = await this.mealRepository.findManyByUserId(
            userId as string
        );

        return { meal };
    }
}

export { ListMealsUseCase };
