import { Box, Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

interface RecipeStepsProps {
  steps: string[];
}

export const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => (
  <Box sx={{ mb: 4 }}>
    <Typography
      variant="h6"
      sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
    >
      <MenuBookIcon />
      作り方
    </Typography>
    <Box component="ol" sx={{ pl: 2 }}>
      {steps.map((step, index) => (
        <Typography component="li" key={index} sx={{ mb: 1 }}>
          {step}
        </Typography>
      ))}
    </Box>
  </Box>
);
