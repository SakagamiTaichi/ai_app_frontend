"use client";

import React, { useState } from "react";
import { CardContent, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { APIRecipeResponse, Ingredient, RecipeIngredient } from "@/app/types";
import { IngredientSearch } from "../IngredientSearch";
import { SearchButton } from "../SearchButton";
import { RecipeHeader } from "../RecipeHeader";
import { RecipeIngredients } from "../RecipeIngredients";
import { RecipeSteps } from "../RecipeSteps";

interface ClientRecipeSearchProps {
  initialIngredients: Ingredient[];
}

const ClientRecipeSearch = ({
  initialIngredients,
}: ClientRecipeSearchProps) => {
  // 選択された食材のリスト（Ingredient型の配列に変更）
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  // 食材のリスト
  const [ingredients] = useState(initialIngredients);
  // レシピが表示されるかどうか
  const [recipeVisible, setRecipeVisible] = useState(false);
  // ローディング中かどうか
  const [isLoading, setIsLoading] = useState(false);
  // レシピの情報
  const [dishName, setDishName] = useState<string>("");
  // レシピの材料
  const [currentRecipeIngredients, setCurrentRecipeIngredients] = useState<
    RecipeIngredient[]
  >([]);
  // レシピの手順
  const [currentSteps, setCurrentSteps] = useState<string[]>([]);

  const onAddIngredient = (newIngredient: Ingredient) => {
    if (!selectedIngredients.some((ing) => ing.name === newIngredient.name)) {
      setSelectedIngredients([...selectedIngredients, newIngredient]);
    }
  };

  const onDeleteIngredient = (ingredientToDelete: string) => {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ingredient) => ingredient.name !== ingredientToDelete
      )
    );
  };

  const handleSearch = async () => {
    if (selectedIngredients.length === 0) {
      alert("食材を選択してください");
      return;
    }

    setIsLoading(true);
    setRecipeVisible(true);
    try {
      const url = process.env.NEXT_PUBLIC_RECIPE_AI_API_URL;
      if (!url) {
        throw new Error("NEXT_PUBLIC_RECIPE_AI_API_URL is not defined");
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: selectedIngredients.map((ing) => ing.name),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: APIRecipeResponse = await response.json();

      setDishName(data.dish_name);
      setCurrentRecipeIngredients(
        data.ingredients.map((ing) => ({
          name: ing.name,
          amount: ing.amount,
        }))
      );
      setCurrentSteps(data.steps);
    } catch (error) {
      console.error("レシピの検索中にエラーが発生しました:", error);
      alert("レシピの検索中にエラーが発生しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          食材からレシピ検索
        </Typography>

        <IngredientSearch
          ingredients={ingredients}
          selectedIngredients={selectedIngredients}
          onAddIngredient={onAddIngredient}
          onDeleteIngredient={onDeleteIngredient}
        />

        <SearchButton isLoading={isLoading} onClick={handleSearch} />
      </Paper>

      {recipeVisible && (
        <>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={600}
              sx={{ p: 3 }}
            />
          ) : (
            <Paper elevation={1} sx={{ p: 3 }}>
              <RecipeHeader dishName={dishName} />
              <CardContent>
                <RecipeIngredients ingredients={currentRecipeIngredients} />
                <RecipeSteps steps={currentSteps} />
              </CardContent>
            </Paper>
          )}
        </>
      )}
    </Stack>
  );
};

export default ClientRecipeSearch;
