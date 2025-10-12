import SafeArea from '../components/common/SafeArea';
import Header from '../components/common/Header'
import CardList from '../components/card/CardList';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/api/axios-instance';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../components/common/SearchForm';


export default function HomePage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();


  const fetchCards = async () => {
    try {
      const categories = JSON.parse(searchParams.get("categories") || "[]");
      const title = searchParams.get("title") || "";

      setLoading(true);
      const { data } = await axiosInstance.get("/music", {
        params: { categories: JSON.stringify(categories), title },
      });
      setCards(data.cards);
    } catch (err) {
      console.error(err);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCards();
  }, [searchParams.toString()]);


  return (
    <>
      <Header />
      <SafeArea className="xl:py-12 lg:py-12 md:py-8 py-4 bg-background">
        <SearchForm onSearch={fetchCards} />
        {<CardList cards={cards} loading={loading} />}
      </SafeArea>
    </>
  );
}