import { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ChatInputProps {
  isConnected: boolean;
  onSubmit: (message: string) => void;
}

export const ChatInput = ({ isConnected, onSubmit }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !isConnected) return;
    onSubmit(input);
    setInput("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        borderTop: 1,
        borderColor: "divider",
        display: "flex",
        gap: 1,
      }}
    >
      <TextField
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="メッセージを入力..."
        variant="outlined"
        size="small"
        disabled={!isConnected}
      />
      <IconButton
        type="submit"
        color="primary"
        disabled={!input.trim() || !isConnected}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};
