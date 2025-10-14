import RequiredRole from "../features/auth/RequiredRole";
import { useAuth } from "../app/providers/AuthProvider";
import CardEditor from "../features/cards/components/CardEditor";
import { SoundWave, PlayButton, SoundWaveProvider } from "../features/cards/components/SoundWave";
import ConfirmationModal from "../features/search/ConfirmationModal";
import AvatarStack from "../features/moderation/components/AvatarStack";
import { useModeratedCards } from "../features/moderation/hooks/useModeratedCards";
import { useModerateActions } from "../features/moderation/hooks/useModerateActions";
import { useState } from "react";
import Header from "../app/layout/Header";
import SafeArea from "../app/layout/SafeArea";


export default function AdminPanel() {
  const HIDE_DURATION = 700;

  const { isAuth, loading, token } = useAuth();
  const [pendingAction, setPendingAction] = useState(null);
  const [isConfirmOpen, setConfirmOpen] = useState(false);


  const { cards,
    selectedCard,
    cardLoaded,
    fadingCardId,
    editorsByCard,
    handleSelectCard,
    hideCardFromList,
    brodcarsCardRemoved, } = useModeratedCards({ isAuth, loading, token });

  const { editorRef, handleUpdate, } = useModerateActions({ selectedCard, hideCardFromList, brodcarsCardRemoved });


  const confirmAction = (callback) => {
    setPendingAction(() => callback);
    setConfirmOpen(true);
  };


  if (cardLoaded) return <div className="p-4">Load...</div>;


  return (
    <RequiredRole role="admin">
      <Header />
      <SafeArea>
        <div className="flex h-screen p-4 gap-6">
          <div className="w-1/4 bg-gray-100 rounded-lg p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">Need moderated</h2>
            {cards.length === 0 && <p className="text-sm text-gray-500">No cards</p>}
            <ul className="space-y-2">
              {cards.map((card) => (
                <li
                  key={card.id}
                  onClick={() => handleSelectCard(card)}
                  className={`cursor-pointer p-2 rounded-lg border hover:bg-gray-200 flex justify-between
                  transition-all duration-${HIDE_DURATION} ease-in-out transform
                  ${selectedCard?.id === card.id ? "border-blue-500" : ""}
                  ${fadingCardId === card.id ? "opacity-0 -translate-x-24" : "opacity-100 translate-x-0"}`}
                >
                  <div className="flex items-center">{card.title}</div>
                  <AvatarStack users={editorsByCard[card.id] || []} />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 bg-white rounded-lg shadow-md p-6 overflow-y-auto">
            {selectedCard ? (
              <div>
                <SoundWaveProvider>
                  <SoundWave audioUrl={selectedCard.audioUrl} />
                  <div className="flex justify-center mt-5">
                    <div className="flex w-[40%]">
                      <PlayButton />
                    </div>
                  </div>
                </SoundWaveProvider>

                <h2 className="text-xl font-bold mb-4">Edit card</h2>
                <CardEditor key={selectedCard.id} card={selectedCard} ref={editorRef} />

                <div className="flex justify-center mt-10 gap-4">
                  <button
                    onClick={() => confirmAction(() => handleUpdate({ status: "approved" }, HIDE_DURATION))}
                    className="px-4 py-2 w-24 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => confirmAction(() => handleUpdate({ status: "rejected" }, HIDE_DURATION))}
                    className="px-4 py-2 w-24 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Select card on the left</p>
            )}
          </div>
        </div>

        <ConfirmationModal
          isOpen={isConfirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={pendingAction}
        />
      </SafeArea>
    </RequiredRole>
  );
}
