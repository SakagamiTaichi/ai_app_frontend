import { useState, useEffect } from "react";
import { Message, WebSocketHookReturn } from "../types";

export const useWebSocket = (url: string | undefined): WebSocketHookReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!url) {
      console.error("WEBSOCKET_URLが定義されていません");
      return;
    }
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket接続が確立されました");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        if (!event.data.trim()) return;
        const response = JSON.parse(event.data);
        const assistantMessage: Message = {
          role: "assistant",
          content: response.content,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("メッセージの解析に失敗しました:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket接続が閉じられました");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocketエラー:", error);
    };

    setWebsocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (!websocket || websocket.readyState !== WebSocket.OPEN) return;

    const userMessage: Message = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      websocket.send(
        JSON.stringify({
          action: "sendmessage",
          message: message,
        })
      );
    } catch (error) {
      console.error("メッセージの送信に失敗しました:", error);
    }
  };

  const resetMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isConnected,
    sendMessage,
    resetMessages,
  };
};
