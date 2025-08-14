import SafeArea from '../components/base/SafeArea';
import Header from '../components/base/Header'
import CardList from '../components/card/CardList';
import AudioUploadForm from '../components/AudioUploadForm';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/api/axios-instance';


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
        {/*<AudioUploadForm />*/}
        {<CardList cards={cards} />}
      </SafeArea>
    </>
  );
}