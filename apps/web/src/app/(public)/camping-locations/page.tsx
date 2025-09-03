// Constants
import { HOME_VIDEO } from "@repo/constants/video";

// Components
import { Header, Footer } from "@packages/ui/layouts";
import { FilterSection, LocationsSection } from "@packages/ui/sections";
import VideoPlayer from "@packages/ui/components/VideoPlayer";

const CampingLocationsPage = () => {
  return (
    <>
      <Header position="absolute" top="0" left={0} zIndex={4} />
      <VideoPlayer
        autoPlay
        {...HOME_VIDEO}
        title={`Last Minute Festive\nPackages From\nSuperbreak`}
        description="Camping Locations"
      />
      <FilterSection />
      <VideoPlayer hasPlayed {...HOME_VIDEO} />
      <LocationsSection />
      <Footer />
    </>
  );
};

export default CampingLocationsPage;
