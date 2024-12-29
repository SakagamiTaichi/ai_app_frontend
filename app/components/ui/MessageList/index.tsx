import { useEffect, useRef } from "react";
import { List, ListItem, ListItemText, Avatar, Paper } from "@mui/material";
import { Message } from "@/app/types";

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <List>
      {messages.map((message, index) => (
        <ListItem
          key={index}
          sx={{
            gap: 1,
            mb: 1,
          }}
        >
          <Avatar>{message.role === "user" ? "U" : "A"}</Avatar>
          <Paper
            sx={{
              p: 2,
              maxWidth: "70%",
            }}
          >
            <ListItemText primary={message.content} />
          </Paper>
        </ListItem>
      ))}
      <div ref={messagesEndRef} />
    </List>
  );
};
