import { intervalToDuration } from "date-fns";

function formatTime(minutes: number) {
  // Calculate duration from 0 to the specified number of minutes
  const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });

  // Extract hours and minutes
  const hours = duration.hours ? `${duration.hours} hr` : "";
  const mins = duration.minutes ? `${duration.minutes} min` : "";

  // Combine hours and minutes with appropriate spacing
  return `${hours}${hours && mins ? " " : ""}${mins}`.trim();
}

export default formatTime;
