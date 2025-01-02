"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Container, Paper, TextField } from "@mui/material";

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

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
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
    }
  };

  const rowsWithId = rows.map((row, index) => ({
    ...row,
    uniqueId: `row-${index}-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`,
  }));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            placeholder="取得したいデータを入力してください"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={2}
          />
          <Button variant="contained" onClick={handleSearch}>
            送信
          </Button>
        </Box>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rowsWithId}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            getRowId={(row) => row.uniqueId}
            pageSizeOptions={[10]}
            // 絶対に一意になるような値を生成する
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>
    </Container>
  );
}
