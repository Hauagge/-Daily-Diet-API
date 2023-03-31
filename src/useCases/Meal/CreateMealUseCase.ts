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
import { IMealRepository } from '../../repository/Meal/IMealRepository';
import { Prisma, Meal } from '@prisma/client';

class DeleteMealUseCase {
    constructor(private mealRepository: IMealRepository) {}

    async execute(mealId: String) {
        const mealExists = await this.mealRepository.findById(id as string);
        if (!mealExists) throw new Error('Meal not found!');
      
        const meal = await this.mealRepository.delete(
            id:mealId,
           
        );

        return { meal };
    }
}

export { DeleteMealUseCase };
