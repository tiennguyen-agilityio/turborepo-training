import { cn } from "@repo/utils/styles";
import { Experience } from "@repo/types/common";

import Heading from "../Heading";
import Button from "../Button";

export interface ExperienceItemProps extends Experience {
  isActive?: boolean;
  onClick?: () => void;
}

const ExperienceItem = ({ title, label = "", isActive = false, onClick }: ExperienceItemProps) => {
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
        className={cn(
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
