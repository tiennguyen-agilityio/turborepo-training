import Link from "next/link";

import Heading from "@/components/Heading";
import FaceFrownIcon from "@/components/Icons/FaceFrownIcon";

const NotFound = () => {
  return (
    <main className="bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center py-40 gap-5">
          <FaceFrownIcon className="size-50" />
          <Heading as="h4" className="text-error">
            404 - Page Not Found
          </Heading>
          <Link
            href="/"
            className="mt-4 rounded-md px-4 py-2 text-card-foreground shover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:underline"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
