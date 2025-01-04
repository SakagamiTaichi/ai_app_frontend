"use client";

import React, { useState } from "react";
import {
  Box,
  CardContent,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { APIRecipeResponse, Ingredient, RecipeIngredient } from "@/app/types";
import { IngredientSearch } from "../IngredientSearch";
import { SearchButton } from "../SearchButton";
import { RecipeHeader } from "../RecipeHeader";
import { RecipeIngredients } from "../RecipeIngredients";
import { RecipeSteps } from "../RecipeSteps";
import { History } from "@mui/icons-material";
import { RecipeHistoryDrawer } from "../RecipeHistoryDrawer";
import { RecipeTipsAndArrangements } from "../RecipeTipsAndArrangements";

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
  const [steps, setSteps] = useState<string[]>([]);

  // レシピのコツ
  const [tips, setTips] = useState<string[]>([]);

  // ドロワーの開閉状態
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
      const url = process.env.NEXT_PUBLIC_CHAT_API_URL + "/recipes/generate";
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
      displayRecipe(data);
    } catch (error) {
      console.error("レシピの検索中にエラーが発生しました:", error);
      alert("レシピの検索中にエラーが発生しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  // レシピ表示関数（履歴からの表示にも使用）
  const displayRecipe = (recipe: APIRecipeResponse) => {
    setDishName(recipe.dish_name);
    setCurrentRecipeIngredients(
      recipe.ingredients.map((ing) => ({
        name: ing.name,
        amount: ing.amount,
      }))
    );
    setSteps(recipe.steps);
    setTips(recipe.tips);
    setRecipeVisible(true);
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Paper elevation={1} sx={{ p: 3, position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography variant="h6">食材からレシピ検索</Typography>
          <IconButton
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            sx={{ mt: -1, mr: -1 }}
          >
            <History />
          </IconButton>
        </Box>

        <IngredientSearch
          ingredients={ingredients}
          selectedIngredients={selectedIngredients}
          onAddIngredient={onAddIngredient}
          onDeleteIngredient={onDeleteIngredient}
        />

        <SearchButton isLoading={isLoading} onClick={handleSearch} />
      </Paper>

      <RecipeHistoryDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        displayRecipe={displayRecipe}
      />

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
                <RecipeSteps steps={steps} />
                {tips && tips.length > 0 && (
                  <RecipeTipsAndArrangements tips={tips} />
                )}
              </CardContent>
            </Paper>
          )}
        </>
      )}
    </Stack>
  );
};

export default ClientRecipeSearch;
