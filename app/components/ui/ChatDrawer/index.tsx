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
  TextField,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { InformationsResponse } from "@/app/types";

interface RecipeHistoryDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

export const ChatDrawer: React.FC<RecipeHistoryDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  // レシピの情報を格納するステート
  const [recipeHistories, setRecipeHistories] = useState<InformationsResponse>({
    informations: [],
  });

  // 新規情報入力用のステート
  const [newDocument, setNewDocument] = useState("");

  //初期描画時にAPIと接続し、データを取得する
  useEffect(() => {
    const fetchData = async () => {
      const url = process.env.NEXT_PUBLIC_CHAT_API_URL + "/rag";
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
        const data: InformationsResponse = await response.json();
        if (!data?.informations) {
          console.error("No recipe histories found in response");
          return;
        }
        const informations = data.informations.map((information) => ({
          id: information.id,
          document: information.document,
        }));
        setRecipeHistories({ informations });
      } catch (error) {
        console.error("Failed to fetch recipe histories:", error);
      }
    };
    fetchData();
  }, []);

  // 送信処理のハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocument.trim()) return;

    // ここにAPIへの送信処理を実装予定
    const url = process.env.NEXT_PUBLIC_CHAT_API_URL + "/rag";
    if (!url) {
      throw new Error("NEXT_PUBLIC_RECIPE_AI_API_URL is not defined");
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ information: newDocument }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch recipe histories:", error);
    }
    // 送信後に入力をクリア
    setNewDocument("");

    // リストに追加
    setRecipeHistories({
      informations: [
        ...recipeHistories.informations,
        {
          id: String(Date.now()),
          document: newDocument,
        },
      ],
    });
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
          width: 500,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: 2 }}
        >
          <Typography variant="h6">検索履歴</Typography>
          <IconButton onClick={() => setIsDrawerOpen(false)} size="small">
            <Close />
          </IconButton>
        </Stack>

        <List sx={{ flex: 1, overflow: "auto" }}>
          {recipeHistories.informations.map((information) => (
            <ListItem key={information.id} disablePadding>
              <ListItemButton>
                <ListItemText primary={information.document} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            marginTop: 2,
            borderTop: 1,
            borderColor: "divider",
            paddingTop: 2,
          }}
        >
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              size="small"
              value={newDocument}
              onChange={(e) => setNewDocument(e.target.value)}
              placeholder="新しい情報を入力"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!newDocument.trim()}
            >
              送信
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};
