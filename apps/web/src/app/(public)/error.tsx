"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";

const Error = ({ reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-fit pb-15 pt-35 gap-6 z-70 bg-foreground dark:bg-background">
      <Heading as="h4" className="text-2xl font-bold text-error mb-2">
        Oops! Something went wrong.
      </Heading>
      <p className="mb-4 text-accent dark:text-current">
        We couldn&rsquo;t load the page. Please try again.
      </p>
      <Button variant="destructive" onClick={() => reset()} className="px-10 py-">
        Try again
      </Button>
    </div>
  );
};

export default Error;
