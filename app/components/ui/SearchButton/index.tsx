import { Button, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export const SearchButton: React.FC<SearchButtonProps> = ({
  isLoading,
  onClick,
}) => (
  <Button
    fullWidth
    variant="contained"
    onClick={onClick}
    startIcon={
      isLoading ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        <SearchIcon />
      )
    }
    disabled={isLoading}
    sx={{
      bgcolor: "rgb(15, 23, 42)",
      "&:hover": { bgcolor: "rgb(30, 41, 59)" },
      py: 1.5,
    }}
  >
    {isLoading ? "検索中..." : "レシピを検索"}
  </Button>
);
