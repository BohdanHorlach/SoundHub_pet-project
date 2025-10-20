import SafeArea from '../app/layout/SafeArea';
import Header from '../app/layout/Header'
import CardList from '../features/cards/components/CardList';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../features/search/SearchForm';
import { useCards } from '../features/cards/hooks/useCards';
import { Pagination } from '../features/search/Pagination';


export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cards, pagination, loading } = useCards("all", searchParams);


  const handlePageChange = (newPage) => {
    const params = Object.fromEntries(searchParams.entries());
    params.page = newPage;
    setSearchParams(params);
  };


  return (
    <>
      <Header />
      <SafeArea className="xl:py-12 lg:py-12 md:py-8 py-4 bg-background">
        <SearchForm />
        <CardList cards={cards} loading={loading} />

        {!loading && pagination.totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <Pagination
              currentPage={searchParams.get("page") || 1}
              totalPages={pagination.totalPages}
              onChange={(newPage) => handlePageChange(newPage)}
            />
          </div>
        )}
      </SafeArea>
    </>
  );
}