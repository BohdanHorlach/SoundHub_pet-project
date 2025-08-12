import { useEffect, useRef } from "react";


export default function useWebSocket({ token, selectedCard, onEditorsUpdate }) {
  const wsRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`${import.meta.env.VITE_WEB_SOCKET_SERVER}?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      if (selectedCard) {
        ws.send(JSON.stringify({ type: "select_card", cardId: selectedCard.id }));
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "editors_update") {
          onEditorsUpdate(data.editors);
        }
      } catch (error) {
        console.error("Failed to parse WS message:", error);
      }
    };

    ws.onclose = () => console.log("WebSocket disconnected");
    ws.onerror = (error) => console.error("WebSocket error:", error);

    return () => {
      ws.close();
    };
  }, [token]);

  useEffect(() => {
    if (selectedCard && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "select_card", cardId: selectedCard.id }));
    }
  }, [selectedCard]);

  return wsRef;
}
