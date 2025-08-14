import clsx from "clsx";

import { Experience } from "@/types/common";

import Heading from "../Heading";
import Button from "../Button";

interface ExperienceItem extends Experience {
  isActive?: boolean;
  onClick?: () => void;
}

const ExperienceItem = ({ title, label = "", isActive = false, onClick }: ExperienceItem) => {
  return (
    <div className="max-w-fit">
      {label && (
        <Heading
          as="h6"
          className="uppercase font-bold text-xs text-center lg:text-left md:text-sm text-ring mb-1.5"
        >
          {label}
        </Heading>
      )}
      <Button
        variant="link"
        className={clsx(
          "capitalize w-fit h-fit text-sm rounded-none text-current md:text-base text-center lg:text-left border-b-1 p-0 sm:pr-2 lg:pr-5 border-transparent hover:text-accent-foreground hover:border-accent-foreground hover:no-underline",
          isActive && "text-accent-foreground border-b-accent-foreground"
        )}
        onClick={onClick}
      >
        {title}
      </Button>
    </div>
  );
};

export default ExperienceItem;
