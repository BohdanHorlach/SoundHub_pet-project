import Header from "../components/common/Header";
import SafeArea from "../components/common/SafeArea";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/common/SearchForm";
import CardList from "../components/card/CardList";
import { useCards } from "../hooks/api/useCards";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";


export default function SavedCardsPage() {
  const [searchParams] = useSearchParams();
  const { cards: favoriteCards, loading: favoriteLoading, fetchCards: fetchFavoriteCards } = useCards("favorite", searchParams);
  const { cards: uploadsCards, loading: uploadsLoading, fetchCards: fetchUploadsCards } = useCards("uploads", searchParams);

  const fetchCards = () => {
    fetchFavoriteCards();
    fetchUploadsCards();
  };


  return (
    <>
      <Header />
      <SafeArea className="xl:py-12 lg:py-12 md:py-8 py-4 bg-background">
        <SearchForm onSearch={fetchCards} />
        <Tabs value="favorite">
          <TabsHeader>
            <Tab value={"favorite"}>Favorite</Tab>
            <Tab value={"uploads"}>Uploads</Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value={"favorite"}>
              <CardList cards={favoriteCards} loading={favoriteLoading} />
            </TabPanel>
            <TabPanel value={"uploads"}>
              <CardList cards={uploadsCards} loading={uploadsLoading} />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </SafeArea>
    </>
  );
}