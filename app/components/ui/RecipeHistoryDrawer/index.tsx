"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  APIRecipeResponse,
  RecipeHistories,
  RecipeHistoriesAPIResponse,
} from "@/app/types";
import { format } from "date-fns";

interface RecipeHistoryDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  displayRecipe: (recipe: APIRecipeResponse) => void;
}

export const RecipeHistoryDrawer: React.FC<RecipeHistoryDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  displayRecipe,
}) => {
  // レシピの情報を格納するステート
  const [recipeHistories, setRecipeHistories] = useState<RecipeHistories>({
    recipeHistories: [],
  });

  //初期描画時にAPIと接続し、データを取得する
  useEffect(() => {
    const fetchData = async () => {
      const url =
        process.env.NEXT_PUBLIC_CHAT_API_URL + "/recipes/recipe-history";
      if (!url) {
        throw new Error("NEXT_PUBLIC_RECIPE_AI_API_URL is not defined");
      }

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: RecipeHistoriesAPIResponse = await response.json();

        // データの存在チェックを追加
        if (!data?.recipe_histories) {
          console.error("No recipe histories found in response");
          return;
        }

        // mapの結果を直接配列として使用
        const recipeHistories = data.recipe_histories.map((recipeHistory) => ({
          id: recipeHistory.id,
          dishName: recipeHistory.dish_name,
          createdAt: recipeHistory.created_at,
        }));

        // 変換後の配列を直接セット
        setRecipeHistories({ recipeHistories });
      } catch (error) {
        console.error("Failed to fetch recipe histories:", error);
      }
    };

    fetchData();
  }, []);

  // レシピ履歴の詳細を表示する関数
  const displayRecipeHistoryDetail = async (recipeId: string) => {
    const url =
      process.env.NEXT_PUBLIC_CHAT_API_URL +
      "/recipes/recipe-detail/" +
      recipeId;
    if (!url) {
      throw new Error("NEXT_PUBLIC_RECIPE_AI_API_URL is not defined");
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: APIRecipeResponse = await response.json();
    displayRecipe(data);
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      variant="persistent"
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box
        sx={{
          width: 300,
          padding: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">検索履歴</Typography>
          <IconButton onClick={() => setIsDrawerOpen(false)} size="small">
            <Close />
          </IconButton>
        </Stack>
        <List>
          {recipeHistories.recipeHistories.map((history) => (
            <ListItem key={history.id} divider disablePadding>
              <ListItemButton>
                <ListItemText
                  id={history.id}
                  primary={history.dishName}
                  secondary={format(
                    new Date(history.createdAt),
                    "yyyy/MM/dd HH:mm:ss"
                  )}
                  onClick={() => displayRecipeHistoryDetail(history.id)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
