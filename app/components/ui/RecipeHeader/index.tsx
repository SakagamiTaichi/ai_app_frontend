import { CardHeader, Box, Typography } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import PeopleIcon from "@mui/icons-material/People";

interface RecipeHeaderProps {
  dishName: string;
}

export const RecipeHeader: React.FC<RecipeHeaderProps> = ({ dishName }) => (
  <CardHeader
    title={dishName}
    subheader={
      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <TimerIcon fontSize="small" />
          <Typography variant="body2">調理時間：約60分</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <PeopleIcon fontSize="small" />
          <Typography variant="body2">4人分</Typography>
        </Box>
      </Box>
    }
  />
);
