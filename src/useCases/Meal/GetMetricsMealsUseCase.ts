import { IMealRepository } from '../../repository/Meal/IMealRepository';
import { Prisma, Meal } from '@prisma/client';

class GetMetricMealsUseCase {
    constructor(private mealRepository: IMealRepository) {}

    async execute(userId: string) {
        const allMealFromUser = await this.mealRepository.findManyByUserId(
            userId as string
        );

        const mealsOnDiet = allMealFromUser.filter(
            (meal) => meal.isFitness === true
        );
        const mealsOutDiet = allMealFromUser.filter(
            (meal) => meal.isFitness === false
        );
        let sequenceNumber = 0;
        let biggerSequenceNumber = 0;
        const totalSequenceOfDaysOnDiet = allMealFromUser.reduce(
            (acc, curr) => {
                if (curr.isFitness) {
                    sequenceNumber++;
                    if (sequenceNumber > acc) {
                        acc = sequenceNumber;
                    }
                } else {
                    sequenceNumber = 0;
                }
                return acc;
            },
            0
        );

        return {
            totalQuantityMeal: allMealFromUser.length - 1,
            totalQuantityMealOnDiet: mealsOnDiet.length - 1,
            totalQuantityMealOutDiet: mealsOutDiet.length - 1,
            totalSequenceOfDaysOnDiet,
        };
    }
}

export { GetMetricMealsUseCase };

//[true, true , true, false, true , true, true, false, true]
