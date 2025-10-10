import { useRef } from "react";
import { updateCardStatus } from "../../utils/api/moderateApi";


export function useModerateActions({ selectedCard, hideCardFromList, brodcarsCardRemoved }) {
  const editorRef = useRef();
  
  const handleUpdate = async (extraData = {}, duration = 700) => {
    if (!selectedCard || !editorRef.current) return;
    const updatedData = editorRef.current.getData();
    const dataToSend = { ...updatedData, ...extraData };
    try {
      await updateCardStatus(selectedCard.id, dataToSend);
      hideCardFromList(selectedCard.id, duration);
      brodcarsCardRemoved(selectedCard.id);
    } catch (e) {
      console.error(e);
    }
  };


  return {
    editorRef,
    handleUpdate,
  };
}
