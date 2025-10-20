import Header from "../app/layout/Header";
import SafeArea from "../app/layout/SafeArea";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../features/search/SearchForm";
import CardList from "../features/cards/components/CardList";
import { useCards } from "../features/cards/hooks/useCards";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";


export default function SavedCardsPage() {
  const [searchParams] = useSearchParams();
  const { cards: favoriteCards, loading: favoriteLoading } = useCards("favorite", searchParams);
  const { cards: uploadsCards, loading: uploadsLoading } = useCards("uploads", searchParams);


  return (
    <>
      <Header />
      <SafeArea className="xl:py-12 lg:py-12 md:py-8 py-4 bg-background">
        <SearchForm />
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