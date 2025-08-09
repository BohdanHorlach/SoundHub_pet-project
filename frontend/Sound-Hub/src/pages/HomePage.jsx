import SafeArea from '../components/base/SafeArea';
import Header from '../components/base/Header'
import CardList from '../components/card/CardList';
import AudioUploadForm from '../components/AudioUploadForm';


export default function HomePage() {
  return (
    <>
      <Header />
      <SafeArea className="xl:py-12 lg:py-12 md:py-8 py-4 bg-background">
        {/*<CardList tracks={
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
        <AudioUploadForm userId={1} />
      </SafeArea>
    </>
  );
}