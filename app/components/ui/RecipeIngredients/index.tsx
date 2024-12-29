import { Box, Typography } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { RecipeIngredient } from "@/app/types";

interface RecipeIngredientsProps {
  ingredients: RecipeIngredient[];
}

export const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  ingredients,
}) => (
  <Box sx={{ mb: 4 }}>
    <Typography
      variant="h6"
      sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
    >
      <RestaurantIcon />
      材料
    </Typography>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 1,
      }}
    >
      {ingredients.map((ingredient, index) => (
        <Box
          key={index}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography>{ingredient.name}</Typography>
          <Typography color="text.secondary">{ingredient.amount}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);
