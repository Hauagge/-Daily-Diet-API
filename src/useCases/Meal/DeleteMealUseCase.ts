import { IMealRepository } from '../../repository/Meal/IMealRepository';
import { Prisma, Meal } from '@prisma/client';

class DeleteMealUseCase {
    constructor(private mealRepository: IMealRepository) {}

    async execute({ id, userId }: Prisma.MealUncheckedUpdateInput) {
        const mealExists = await this.mealRepository.findById(id as string);
        if (!mealExists) throw new Error('Meal not found!');
        if (mealExists.userId !== userId) {
            throw new Error('You are not the owner of this meal!');
        }
        const meal = await this.mealRepository.delete(id as string);

        return { meal };
    }
}

export { DeleteMealUseCase };
