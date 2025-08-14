import { Suspense } from "react";

// Constants
import { HOME_VIDEO } from "@/constants/video";

// Components
import VideoPlayer from "@/components/VideoPlayer";
import Loading from "@/components/Loading";
import DiscoverSection from "@/sections/DiscoverSection";
import FilterSection from "@/sections/LocationFilter";
import LocationsSection from "@/sections/LocationsSection";

const CampingLocationsPage = () => {
  return (
    <div className="w-full overflow-hidden">
      <VideoPlayer
        autoPlay
        {...HOME_VIDEO}
        subTitle="Experience a Different Africa"
        title={
          <>
            Last Minute Festive
            <br />
            Packages From
            <br />
            Superbreak
          </>
        }
        description="Camping Locations"
      />
      <FilterSection />
      <DiscoverSection />
      <VideoPlayer hasPlayed {...HOME_VIDEO} />
      <Suspense fallback={<Loading />}>
        <LocationsSection />
      </Suspense>
    </div>
  );
};

export default CampingLocationsPage;
