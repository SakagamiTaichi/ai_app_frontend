import { Alert, AlertTitle, Box, Typography } from "@mui/material";

interface RecipeTipsAndArrangementsProps {
  tips: string[];
  arrangements: string[];
}

export const RecipeTipsAndArrangements: React.FC<
  RecipeTipsAndArrangementsProps
> = ({ tips }) => (
  <>
    <Alert severity="info" sx={{ mb: 2 }}>
      <AlertTitle>コツ・ポイント</AlertTitle>
      <Box component="ul" sx={{ pl: 2, mt: 1 }}>
        {tips.map((tip, index) => (
          <Typography component="li" key={index} sx={{ mb: 1 }}>
            {tip}
          </Typography>
        ))}
      </Box>
    </Alert>
  </>
);
