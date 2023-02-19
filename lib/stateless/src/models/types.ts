type MealType = 'breakfast' | 'lunch' | 'dinner';
type Preparation = 'vegan' | 'meat'
type MealSize = 'small' | 'medium' | 'large'

export interface mealPlanProps {
    employee: string;
    mealType: MealType;
    preparation: Preparation;
    mealSize: MealSize;
}

export interface submitMealPlanProps {
    id?: string;
    mealDate?: string;
    mealTime?: string;
    createdAt?: string;
    updatedAt?: string;
    employee: string;
    mealType: MealType;
    preparation: Preparation;
    mealSize: MealSize;
}