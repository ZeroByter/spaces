export const renderTimestamp = (timestamp: string | number) => {
  const finalTimestamp =
    typeof timestamp == "string" ? parseInt(timestamp) : timestamp;

  return new Date(finalTimestamp).toLocaleString("en-IL");
};
