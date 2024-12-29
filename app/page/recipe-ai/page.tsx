import ClientRecipeSearch from "../../components/ui/RecipeSearch";
import { Ingredient } from "../../types";

async function getIngredients(): Promise<Ingredient[]> {
  var url = process.env.BACKEND_API_URL + "/ingredient/readall";
  if (!url) {
    throw new Error("BACKEND_API_URL is not defined");
  }
  const response = await fetch(url);
  const data = await response.json();

  return data.map(
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
