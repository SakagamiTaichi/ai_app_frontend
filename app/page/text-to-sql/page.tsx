"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

// Define types for the API response
interface ResponseData {
  columns: GridColDef[];
  rows: any[];
}

export default function DataGridDemo() {
  const [input, setInput] = React.useState("");
  // Add state for dynamic columns and rows
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const [rows, setRows] = React.useState<any[]>([]);
  // ローディング中かどうか
  const [isLoading, setIsLoading] = React.useState(false);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const url =
        process.env.NEXT_PUBLIC_CHAT_API_URL + "/text-to-sql?input=" + input;
      if (!url) {
        throw new Error("NEXT_PUBLIC_CHAT_API_URL is not defined");
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: ResponseData = await response.json();

      // Update the columns and rows with the response data
      setColumns(data.columns);
      setRows(data.rows);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const rowsWithId = rows.map((row, index) => ({
    ...row,
    uniqueId: `row-${index}-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 11)}`,
  }));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              placeholder="取得したいデータを入力してください"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              multiline
              maxRows={2}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={isLoading}
              sx={{
                bgcolor: "rgb(15, 23, 42)",
                "&:hover": { bgcolor: "rgb(30, 41, 59)" },
                py: 1.5,
                minWidth: "120px", // 固定幅を設定
                px: 3, // 水平方向のパディングを追加
                whiteSpace: "nowrap", // テキストの折り返しを防止
              }}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SearchIcon />
                )
              }
            >
              {isLoading ? "実行中..." : "実行"}
            </Button>
          </Box>
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              slotProps={{
                loadingOverlay: {
                  variant: "skeleton",
                  noRowsVariant: "skeleton",
                },
              }}
              loading={isLoading}
              rows={rowsWithId}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              // 絶対に一意になるような値を生成する
              getRowId={(row) => row.uniqueId}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
