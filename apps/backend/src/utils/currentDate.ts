export default function currentDate() {
  const startOfDay = new Date();
  // Set to start of the day in UTC
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date();
  // Set to end of the day in UTC
  endOfDay.setUTCHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
}
