import { Typography, Button, Box, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import SignalWifiOffIcon from "@mui/icons-material/SignalWifiOff";

interface ChatHeaderProps {
  isConnected: boolean;
  onReset: () => void;
}

export const ChatHeader = ({ isConnected, onReset }: ChatHeaderProps) => (
  <Box
    sx={{
      p: 2,
      borderBottom: 1,
      borderColor: "divider",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      bgcolor: "background.paper",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "medium" }}>
        AI Chat
      </Typography>
      <Chip
        icon={
          isConnected ? <SignalWifiStatusbar4BarIcon /> : <SignalWifiOffIcon />
        }
        label={isConnected ? "接続中" : "未接続"}
        color={isConnected ? "success" : "error"}
        size="small"
        variant="outlined"
        sx={{
          "& .MuiChip-icon": {
            color: "inherit",
          },
          transition: "all 0.3s ease",
        }}
      />
    </Box>
    <Button
      variant="outlined"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={onReset}
      size="small"
      sx={{
        "&:hover": {
          bgcolor: "error.light",
          color: "error.contrastText",
          borderColor: "error.main",
        },
        transition: "all 0.2s ease",
      }}
    />
  </Box>
);
