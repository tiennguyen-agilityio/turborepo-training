"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import FaceFrownIcon from "@/components/Icons/FaceFrownIcon";

const GlobalError = ({ reset }: { error: Error; reset: () => void }) => {
  return (
    <main className="flex flex-col mx-auto items-center justify-center h-fit pt-45 pb-25 gap-6">
      <FaceFrownIcon className="size-50" />
      <Heading as="h4" className="text-2xl font-bold text-center text-error mb-2">
        Oops! Something went wrong.
        <br />
        Please try again!
      </Heading>
      <Button variant="destructive" onClick={() => reset()} className="px-10 py-">
        Try again
      </Button>
    </main>
  );
};

export default GlobalError;
