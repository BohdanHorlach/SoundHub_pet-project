import SafeArea from '../components/common/SafeArea';
import Header from '../components/common/Header'
import CardList from '../components/card/CardList';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../components/common/SearchForm';
import { useCards } from '../hooks/api/useCards';


export default function HomePage() {
  const [searchParams] = useSearchParams();
  const { cards, loading, fetchCards } = useCards("all", searchParams);

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