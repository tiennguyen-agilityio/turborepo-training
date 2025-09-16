// Constants
import { HOME_VIDEO } from "@packages/constants/video";

// Components
import LocationsSection from "@/sections/LocationsSection";
import FilterSection from "@packages/ui/sections/FilterSection";
import VideoPlayer from "@packages/ui/components/VideoPlayer";

const CampingLocationsPage = () => {
  return (
    <>
      <VideoPlayer
        autoPlay
        {...HOME_VIDEO}
        title={`Last Minute Festive\nPackages From\nSuperbreak`}
        description="Camping Locations"
      />
      <FilterSection />
      <VideoPlayer hasPlayed {...HOME_VIDEO} />
      <LocationsSection />
    </>
  );
};

export default CampingLocationsPage;
