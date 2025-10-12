import { useEffect, useState } from "react";
import { fetchPendingCards } from "../../utils/api/moderateApi";
import useWebSocket from "../api/useWebScket";


export function useModeratedCards({ isAuth, loading, token }) {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [fadingCardId, setFadingCardId] = useState(null);
  const [cardLoaded, setCardLoaded] = useState(true);
  const [editorsByCard, setEditorsByCard] = useState({});

  const { broadcastCardSelection, brodcarsCardRemoved } = useWebSocket({
    token,
    onEditorsUpdate: setEditorsByCard,
    onCardRemoved: (cardId) => hideCardFromList(cardId)
  });


  useEffect(() => {
    if (loading || !isAuth) return;
    fetchPendingCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(console.error)
      .finally(() => setCardLoaded(false));
  }, [isAuth, loading]);


  const hideCardFromList = (id, duration = 700) => {
    setFadingCardId(id);
    if (selectedCard?.id === id) setSelectedCard(null);
    setTimeout(() => {
      setCards((prev) => prev.filter((c) => c.id !== id));
      setFadingCardId(null);
    }, duration);
  };


  const handleSelectCard = (card) => {
    broadcastCardSelection(card.id);
    setSelectedCard(card);
  };

  
  return {
    cards,
    selectedCard,
    cardLoaded,
    fadingCardId,
    editorsByCard,
    setSelectedCard,
    handleSelectCard,
    hideCardFromList,
    brodcarsCardRemoved,
  };
}
