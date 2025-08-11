import SafeArea from '../components/base/SafeArea';
import Header from '../components/base/Header'
import CardList from '../components/card/CardList';
import AudioUploadForm from '../components/AudioUploadForm';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios/axios-instance';


export default function HomePage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      await axiosInstance.get("/music")
        .then((response) => {
          setCards(response.data.cards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log("HomePage useEffect mounted");
    getCards();
  }, []);


  return (
    <>
      <Header />
      <SafeArea className="xl:py-12 lg:py-12 md:py-8 py-4 bg-background">
        <CardList cards={cards} />
        { /*<CardList tracks={
          [
            {
              name: "guitar_sample0",
              url: "/temp/audio/guitar_sample.wav",
              categories: ["Default1", "Default2", "Default3", "Default4"],
              isFavorite: false
            },
            {
              name: "guitar_sample1",
              url: "/temp/audio/guitar_sample.wav",
              categories: ["Default1", "Default2", "Default3", "Default4"],
              isFavorite: false
            },
            {
              name: "guitar_sample2",
              url: "/temp/audio/guitar_sample.wav",
              categories: ["Default1", "Default2", "Default3", "Default4"],
              isFavorite: false
            },
            {
              name: "guitar_sample4",
              url: "/temp/audio/guitar_sample.wav",
              categories: ["Default1", "Default2", "Default3", "Default4"],
              isFavorite: false
            }]} />*/}
      </SafeArea>
    </>
  );
}