import { SVGProps } from "@/types/svg";

const PlayIcon = ({ color = "currentColor", width = 24, height = 24, ...props }: SVGProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={color} {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
};

export default PlayIcon;
