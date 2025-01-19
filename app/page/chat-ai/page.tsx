"use client";

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
} from "@mui/material";

interface Message {
  content: string;
  isUser: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "こんにちはなのだ！ずんだもんとお話しましょう！",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      // Cleanup EventSource on component unmount
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { content: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Close existing EventSource if any
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      // Create new EventSource
      const encodedMessage = encodeURIComponent(input);
      eventSourceRef.current = new EventSource(
        `${process.env.NEXT_PUBLIC_CHAT_API_URL}/chat/stream?message=${encodedMessage}`
      );

      let responseText = "";

      eventSourceRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (responseText === "") {
            // Create new message for first chunk
            responseText = data.content;
            setMessages((prev) => [
              ...prev,
              { content: responseText, isUser: false },
            ]);
          } else {
            // Update existing message for subsequent chunks
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

  const handleReset = () => {
    setMessages([
      {
        content: "こんにちはなのだ！ずんだもんとお話しましょう！",
        isUser: false,
      },
    ]);
    setInput("");
    setIsLoading(false);
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat with Zundamon
          </Typography>
          <Button color="inherit" onClick={handleReset}>
            Reset Chat
          </Button>
        </Toolbar>
      </AppBar>
      <Paper
        elevation={3}
        sx={{ height: "70vh", display: "flex", flexDirection: "column", mt: 2 }}
      >
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
              placeholder="Type a message..."
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
  );
}
