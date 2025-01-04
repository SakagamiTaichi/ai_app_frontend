//app/page/recipe-ai/page.tsx
import ingredientsData from "@/app/data/ingredients";
import ClientRecipeSearch from "../../components/ui/RecipeSearch";
import { Ingredient } from "../../types";

async function getIngredients(): Promise<Ingredient[]> {
  return ingredientsData.map(
    (ingredient: { _id: string; name: string; category: string }) => ({
      id: ingredient._id,
      name: ingredient.name,
      category: ingredient.category,
    })
  );
}

export default async function RecipeSearch() {
  const ingredients = await getIngredients();
  return <ClientRecipeSearch initialIngredients={ingredients} />;
}
