"use client";

import React, { use, useEffect, useState } from "react";
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
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [value, setValue] = useState<Ingredient | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [recipeVisible, setRecipeVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients] = useState(initialIngredients);
  const [dishName, setDishName] = useState<string>("");
  const [currentRecipeIngredients, setCurrentRecipeIngredients] = useState<
    RecipeIngredient[]
  >([]);
  const [currentSteps, setCurrentSteps] = useState<string[]>([]);

  const handleAddIngredient = () => {
    if (inputValue && !selectedIngredients.includes(inputValue)) {
      setSelectedIngredients([...selectedIngredients, inputValue]);
      setInputValue("");
      setValue(null);
    }
  };

  const handleDelete = (ingredientToDelete: string) => {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ingredient) => ingredient !== ingredientToDelete
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
          ingredients: selectedIngredients,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: APIRecipeResponse = await response.json();

      // 受け取ったデータで状態を更新
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
          inputValue={inputValue}
          value={value}
          setValue={setValue}
          onInputChange={setInputValue}
          onAddIngredient={handleAddIngredient}
          onDeleteIngredient={handleDelete}
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
                {/* 一旦保留 */}
                {/* <RecipeTipsAndArrangements
            tips={tips}
            arrangements={arrangements}
          /> */}
              </CardContent>
            </Paper>
          )}
        </>
      )}
    </Stack>
  );
};

export default ClientRecipeSearch;
