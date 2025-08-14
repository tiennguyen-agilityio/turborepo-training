import clsx from "clsx";
import { Separator } from "../ui/separator";

interface DividerProps {
  text?: string;
  className?: string;
}

const Divider = ({ text = "", className = "" }: DividerProps) => {
  return (
    <Separator className={clsx("w-full bg-input relative", className)}>
      {text && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-background z-2">
          {text}
        </span>
      )}
    </Separator>
  );
};

export default Divider;
