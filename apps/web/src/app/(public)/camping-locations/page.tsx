import { Suspense } from "react";

// Constants
import { HOME_VIDEO } from "@repo/constants/video";

// Components
import VideoPlayer from "@repo/ui/components/VideoPlayer";
import Loading from "@repo/ui/components/Loading";
import DiscoverSection from "@repo/ui/sections/DiscoverSection";
import FilterSection from "@repo/ui/sections/LocationFilter";
import LocationsSection from "@repo/ui/sections/LocationsSection";

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
