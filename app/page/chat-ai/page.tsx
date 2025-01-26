"use client";
import { v4 as uuidv4 } from "uuid";
import { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NoteIcon from "@mui/icons-material/Note";
import { ChatDrawer } from "@/app/components/ui/ChatDrawer";

interface Message {
  content: string;
  isUser: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "こんにちは！お話しましょう！",
      isUser: false,
    },
  ]);
  const [sessionId, setSessionId] = useState<string>(() => uuidv4());
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  // ドロワーの開閉状態
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const handleReset = () => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    setMessages([
      {
        content: "こんにちは！お話しましょう！",
        isUser: false,
      },
    ]);
    setInput("");
    setIsLoading(false);
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { content: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      const encodedMessage = encodeURIComponent(input);
      eventSourceRef.current = new EventSource(
        `${process.env.NEXT_PUBLIC_CHAT_API_URL}/chat/stream?message=${encodedMessage}&session_id=${sessionId}`
      );

      let responseText = "";

      eventSourceRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (responseText === "") {
            responseText = data.content;
            setMessages((prev) => [
              ...prev,
              { content: responseText, isUser: false },
            ]);
          } else {
            responseText += data.content;
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = {
                content: responseText,
                isUser: false,
              };
              return newMessages;
            });
          }
        } catch (error) {
          console.error("Error parsing SSE data:", error);
        }
      };

      eventSourceRef.current.onerror = (error) => {
        console.error("SSE Error:", error);
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }
        setIsLoading(false);
      };

      eventSourceRef.current.addEventListener("close", () => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{ height: "80vh", display: "flex", flexDirection: "column" }}
        >
          {/* Header */}
          <AppBar
            position="static"
            color="inherit"
            elevation={0}
            sx={{ backgroundColor: "#fff8ee", mb: 2 }}
          >
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <IconButton
                color="inherit"
                onClick={handleReset}
                disabled={isLoading}
                size="large"
              >
                <RestartAltIcon />
              </IconButton>
              <IconButton
                color="inherit"
                size="large"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              >
                <NoteIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Chat messages */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  maxWidth: "80%",
                  alignSelf: message.isUser ? "flex-end" : "flex-start",
                  backgroundColor: message.isUser ? "#e3f2fd" : "#f5f5f5",
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography>{message.content}</Typography>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input area */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                placeholder="メッセージを入力してください..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                multiline
                maxRows={4}
              />
              <Button
                variant="contained"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
              >
                送信
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
      <ChatDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </Stack>
  );
}
