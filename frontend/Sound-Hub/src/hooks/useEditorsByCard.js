import { useState } from "react";


export default function useEditorsByCard() {
  const [editorsByCard, setEditorsByCard] = useState({});

  const updateEditors = (editors) => {
    setEditorsByCard(editors);
  };

  return { editorsByCard, updateEditors };
}
