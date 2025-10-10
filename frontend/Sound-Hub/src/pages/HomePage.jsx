import SafeArea from '../components/common/SafeArea';
import Header from '../components/common/Header'
import CardList from '../components/card/CardList';
import AudioUploadForm from '../components/upload form/AudioUploadForm';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/api/axios-instance';


export default function HomePage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getCards = async () => {
      await axiosInstance.get("/music")
        .then((response) => {
          setCards(response.data.cards);
        })
        .catch((error) => {
          console.log(error);
          setCards(
            [
              {
                id: 100000,
                title: "guitar_test1",
                categories: [{ name: "Guitar1" }, { name: "Guitar2" }, { name: "Guitar3" }, { name: "Guitar4" }, { name: "Guitar5" }, { name: "Guitar6" }],
                audioUrl: "public/temp/audio/guitar_sample.wav"
              },
              {
                id: 100001,
                title: "house_sample_test2",
                categories: [{ name: "House1" }, { name: "House2" }, { name: "House3" }, { name: "House4" }, { name: "House5" }, { name: "House6" }],
                audioUrl: "public/temp/audio/rally_day_house_140bpm_C_Min.wav"
              },
              {
                id: 100002,
                title: "space_test1",
                categories: [{ name: "Space1" }, { name: "Space2" }, { name: "Space3" }, { name: "Space4" }, { name: "Space5" }, { name: "Space6" }],
                audioUrl: "public/temp/audio/simple_house_melody_140bpm_F_Major.wav"
              }
            ]
          );
        }).finally(() => {
          setLoading(false);
        });
    }
    console.log("HomePage useEffect mounted");
    getCards();
  }, []);


  return (
    <>
      <Header />
      <SafeArea className="xl:py-12 lg:py-12 md:py-8 py-4 bg-background">
        {<AudioUploadForm />}
        {<CardList cards={cards} loading={loading} />}
      </SafeArea>
    </>
  );
}