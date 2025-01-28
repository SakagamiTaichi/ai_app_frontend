"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueFormatter } from "@mui/x-data-grid";
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InitSQLDataAPIResponse } from "@/app/types";

// データ行の基本型を定義
interface BaseRow {
  [key: string]: string | number | boolean | null;
}

// ユニークIDを含むデータ行の型を定義
interface DataRow extends BaseRow {
  uniqueId: string;
}

// APIレスポンスの型を定義
interface ResponseData {
  sql: string;
  columns: GridColDef[];
  rows: BaseRow[];
}

export default function DataGridDemo() {
  const [input, setInput] = React.useState("");
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const [rows, setRows] = React.useState<BaseRow[]>([]);
  const [sql, setSql] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // 初期描画時にAPIと接続し、データを取得する
  React.useEffect(() => {
    const fetchData = async () => {
      const url =
        process.env.NEXT_PUBLIC_CHAT_API_URL + "/text-to-sql/init-data";
      if (!url) {
        throw new Error("NEXT_PUBLIC_CHAT_API_URL is not defined");
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
        const data: InitSQLDataAPIResponse = await response.json();

        // columnsの設定
        const gridColumns: GridColDef[] = [
          {
            field: "id",
            headerName: "ID",
            width: 100,
          },
          {
            field: "name",
            headerName: "氏名",
            width: 150,
          },
          {
            field: "name_kana",
            headerName: "フリガナ",
            width: 150,
          },
          {
            field: "sex",
            headerName: "性別",
            width: 100,
          },
          {
            field: "phone_number",
            headerName: "電話番号",
            width: 150,
          },
          {
            field: "mail",
            headerName: "メールアドレス",
            width: 200,
          },
          {
            field: "postcode",
            headerName: "郵便番号",
            width: 120,
          },
          {
            field: "address",
            headerName: "住所",
            width: 300,
          },
          {
            field: "birthday",
            headerName: "生年月日",
            width: 150,
          },
          {
            field: "age",
            headerName: "年齢",
            width: 100,
          },
          {
            field: "blood_type",
            headerName: "血液型",
            width: 100,
          },
        ];

        // rowsの設定
        // APIから取得したデータをそのまま使用（idは既に含まれているため、追加で指定する必要なし）
        const gridRows: BaseRow[] = data.informations.map((info) => ({
          ...info,
        }));

        // 状態を更新
        setColumns(gridColumns);
        setRows(gridRows);
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    };

    fetchData();
  }, []);

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

      setColumns(data.columns);
      setRows(data.rows);
      setSql(data.sql);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const rowsWithId: DataRow[] = rows.map((row, index) => ({
    ...row,
    uniqueId: `row-${index}-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 11)}`,
  }));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                  minWidth: "120px",
                  px: 3,
                  whiteSpace: "nowrap",
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

            {/* SQL文を表示するセクションを追加 */}
            {sql && (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  backgroundColor: "rgb(241, 245, 249)",
                  whiteSpace: "pre-wrap",
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                }}
              >
                <Box
                  sx={{ color: "rgb(51, 65, 85)", mb: 1, fontWeight: "medium" }}
                >
                  生成されたSQL:
                </Box>
                {sql}
              </Paper>
            )}

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
                getRowId={(row) => row.uniqueId}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
