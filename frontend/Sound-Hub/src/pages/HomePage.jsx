import SafeArea from '../app/layout/SafeArea';
import Header from '../app/layout/Header'
import CardList from '../features/cards/components/CardList';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../features/search/SearchForm';
import { useCards } from '../features/cards/hooks/useCards';


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