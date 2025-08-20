import { CAROUSELS } from "@repo/constants/carousel";

import Heading from "@repo/ui/components/Heading";
import Carousel from "@repo/ui/components/Carousel";

const DiscoverSection = () => {
  return (
    <section className="bg-sidebar-accent py-24">
      <div className="container mx-auto px-5">
        <Heading as="h6" className="font-bold text-ring mb-5">
          DISCOVER
        </Heading>
        <Carousel list={CAROUSELS} />
      </div>
    </section>
  );
};

export default DiscoverSection;
