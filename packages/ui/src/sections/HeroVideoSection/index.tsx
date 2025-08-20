import { HOME_VIDEO } from "@repo/constants/video";

import VideoPlayer from "@repo/ui/components/VideoPlayer";
import Heading from "@repo/ui/components/Heading";

const HeroVideoSection = ({ title }: { title: string }) => {
  return (
    <div className="w-full overflow-hidden">
      <VideoPlayer hasPlayed {...HOME_VIDEO} />
      <div className="container mx-auto my-15 px-5">
        <Heading as="h2">{title}</Heading>
      </div>
    </div>
  );
};

export default HeroVideoSection;
