//app/page/recipe-ai/page.tsx
import ClientRecipeSearch from "../../components/ui/RecipeSearch";
import { Ingredient } from "../../types";

async function getIngredients(): Promise<Ingredient[]> {
  // const url = process.env.BACKEND_API_URL + "/ingredient/readall";
  // if (!url) {
  //   throw new Error("BACKEND_API_URL is not defined");
  // }
  // const response = await fetch(url, {
  //   next: {
  //     revalidate: 3600, // 1時間キャッシュ
  //   },
  // });
  // const data = await response.json();

  // ダミーのデータを返す
  const data = [
    {
      _id: "1",
      name: "キャベツ",
      category: "野菜",
    },
    {
      _id: "2",
      name: "牛肉",
      category: "肉",
    },
    {
      _id: "3",
      name: "卵",
      category: "卵・乳製品",
    },
    {
      _id: "4",
      name: "牛乳",
      category: "卵・乳製品",
    },
    {
      _id: "5",
      name: "小麦粉",
      category: "穀物",
    },
    {
      _id: "6",
      name: "砂糖",
      category: "その他",
    },
  ];

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
