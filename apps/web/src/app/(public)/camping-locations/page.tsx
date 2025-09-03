import { YStack } from "tamagui";

// Constants
import { HOME_VIDEO } from "@repo/constants/video";

// Components
import { Header, Footer } from "@packages/tamagui-ui/layouts";
import { FilterSection, LocationsSection } from "@packages/tamagui-ui/sections";
import VideoPlayer from "@packages/tamagui-ui/components/VideoPlayer";

const CampingLocationsPage = () => {
  return (
    <YStack>
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
    </YStack>
  );
};

export default CampingLocationsPage;
