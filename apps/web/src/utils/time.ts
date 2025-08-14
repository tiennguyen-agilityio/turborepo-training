import { formatDuration, intervalToDuration, addMinutes } from "date-fns";

export const formatMinutes = (minutes: number) => {
  if (minutes < 0) return "Invalid time";
  if (minutes === 0) return "0 minutes";

  const duration = intervalToDuration({
    start: new Date(0),
    end: addMinutes(new Date(0), minutes),
  });

  return formatDuration(duration, { format: ["days", "hours", "minutes"] });
};
