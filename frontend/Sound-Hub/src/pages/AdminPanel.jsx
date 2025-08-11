import { useEffect, useRef, useState } from "react";
import axiosInstance from "../utils/axios/axios-instance";
import RequiredRole from "../components/auth/RequiredRole";
import { useAuth } from "../components/auth/AuthProvider";
import CardEditor from "../components/card/CardEditor";
import { SoundWave, PlayButton, SoundWaveProvider } from "../components/card/SoundWave";


export default function AdminPanel() {
  const { isAuth, loading } = useAuth();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardLoaded, setLoading] = useState(true);
  const editorRef = useRef();


  useEffect(() => {
    if (loading || !isAuth) return;

    axiosInstance.get("/music", { params: { page: 1, limit: 30, status: "pending" } })
      .then(res => {
        const pendingCards = res.data.cards.filter(card => card.status === "pending");
        setCards(pendingCards);
        if (pendingCards.length > 0) setSelectedCard(pendingCards[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAuth, loading]);


  const handleUpdate = async (extraData = {}) => {
    if (!selectedCard || !editorRef.current) return;

    const updatedData = editorRef.current.getData();
    const dataToSend = { ...updatedData, ...extraData };

    try {
      await axiosInstance.post(`/music/${selectedCard.id}`, dataToSend, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Update failed:", error);
    }
  };


  if (cardLoaded)
    return <div className="p-4">Load...</div>;


  return (
    <RequiredRole role="admin">
      <div className="flex h-screen p-4 gap-6">
        <div className="w-1/4 bg-gray-100 rounded-lg p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Need modereted</h2>
          {cards.length === 0 && <p className="text-sm text-gray-500">No cards</p>}
          <ul className="space-y-2">
            {cards.map((card) => (
              <li
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`cursor-pointer p-2 rounded-lg border 
                  ${selectedCard?.id === card.id ? "bg-blue-100 border-blue-500" : "hover:bg-gray-200"}`}
              >
                {card.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-md p-6 overflow-y-auto">
          {selectedCard ? (
            <>
              <SoundWaveProvider>
                <SoundWave audioUrl={selectedCard.audioUrl} />
                <PlayButton />
              </SoundWaveProvider>
              <h2 className="text-xl font-bold mb-4">Edit card</h2>
              <CardEditor
                key={selectedCard.id}
                card={selectedCard}
                ref={editorRef}
              />
              <div className="mt-4">
                <button
                  onClick={() => { handleUpdate({ status: "approved" }) }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => { handleUpdate({ status: "rejected" }) }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Reject
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Select card on the left</p>
          )}
        </div>
      </div>
    </RequiredRole>
  );
}
