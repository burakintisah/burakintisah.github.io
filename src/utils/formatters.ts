/**
 * Formats a Firestore timestamp, Date, number, or string into a locale string.
 */
export const formatTimestamp = (timestamp: { toDate?: () => Date } | Date | number | string | null): string => {
  if (!timestamp) return 'Unknown';

  let date: Date;
  if (typeof timestamp === 'object' && timestamp !== null && 'toDate' in timestamp && timestamp.toDate) {
    date = timestamp.toDate();
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    date = new Date(timestamp);
  }

  return date.toLocaleString();
};
