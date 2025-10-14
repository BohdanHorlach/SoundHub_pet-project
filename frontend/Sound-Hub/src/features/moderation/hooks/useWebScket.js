import { useEffect, useRef } from "react";


export default function useWebSocket({ token, onEditorsUpdate, onCardRemoved }) {
  const wsRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`${import.meta.env.VITE_WEB_SOCKET_SERVER}?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => console.log("WebSocket connected");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "editorsUpdate") {
          onEditorsUpdate(data.editors);
        }
        if (data.type === "cardRemoved") {
          onCardRemoved?.(data.cardId);
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


  const brodcastCardUpdated = (cardId, updateType) => {
    if (cardId && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: updateType, cardId: cardId }));
    }
  }

  const broadcastCardSelection = (cardId) => brodcastCardUpdated(cardId, "selectCard");
  const brodcarsCardRemoved = (cardId) => brodcastCardUpdated(cardId, "removeCard");

  return { wsRef, broadcastCardSelection, brodcarsCardRemoved};
}
