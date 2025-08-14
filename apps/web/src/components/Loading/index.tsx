import { cn } from "@/utils/styles";

interface LoadingProps {
  iconOnly?: boolean;
  iconClassName?: string;
  wrapperClassName?: string;
}

const Loading = ({ iconOnly = false, iconClassName = "", wrapperClassName = "" }: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-screen w-full gap-4",
        wrapperClassName
      )}
    >
      <div
        className={cn(
          "animate-spin rounded-full size-12 border-4 border-t-transparent",
          iconClassName
        )}
      />
      {!iconOnly && <span className="text-sm text-current">Loading...</span>}
    </div>
  );
};

export default Loading;
