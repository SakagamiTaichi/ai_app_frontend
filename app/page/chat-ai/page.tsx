"use client";

import { ChatHeader } from "@/app/components/ui/ChatHeader";
import { ChatInput } from "@/app/components/ui/ChatInput";
import { MessageList } from "@/app/components/ui/MessageList";
import { useWebSocket } from "@/app/hooks/useWebSocket";
import { Container, Paper, Box } from "@mui/material";

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_TALK_API_URL;

export default function ChatAI() {
  const { messages, isConnected, sendMessage, resetMessages } =
    useWebSocket(WEBSOCKET_URL);

  return (
    <Container maxWidth="md" sx={{ height: "80vh", py: 4 }}>
      <Paper
        elevation={3}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <ChatHeader isConnected={isConnected} onReset={resetMessages} />
        <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
          <MessageList messages={messages} />
        </Box>
        <ChatInput isConnected={isConnected} onSubmit={sendMessage} />
      </Paper>
    </Container>
  );
}
