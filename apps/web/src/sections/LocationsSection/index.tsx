"use client";

// Types
import { LocationItem } from "@/types/location";

// Constants
import { PAGE_SIZE } from "@/constants/common";

// Hooks
import { useLoadMore } from "@/hooks/useLoadMore";

// Services
import { fetchLocations } from "@/services/location";

// Components
import Button from "@/components/Button";
import LocationCard from "@/components/LocationCard";
import Loading from "@/components/Loading";
import SkeletonLocationCard from "@/components/SkeletonLocationCard";

const LocationsSection = () => {
  const {
    data: locations,
    onLoadMore,
    isLoading,
    hasMore,
    error,
  } = useLoadMore<LocationItem>({ fetcher: fetchLocations, limit: PAGE_SIZE });

  return (
    <section className="container mx-auto my-10 md:my-20 lg:my-25 px-5">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {locations?.map((item) => {
          return (
            <div key={item.id} className="md:col-span-1">
              <LocationCard item={item} href="" />
            </div>
          );
        })}
        {isLoading && [...Array(PAGE_SIZE)].map((_, i) => <SkeletonLocationCard key={i} />)}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-25">
          <Button disabled={isLoading} className="w-37.5" onClick={onLoadMore}>
            Load More
            {isLoading && <Loading iconOnly iconClassName="size-6!" wrapperClassName="w-fit!" />}
          </Button>
        </div>
      )}

      {error && <p className="text-error">{error}</p>}
    </section>
  );
};

export default LocationsSection;
