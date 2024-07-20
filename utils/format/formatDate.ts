export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid date string.");
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime(); // Différence en millisecondes
  const diffSec = Math.floor(diffMs / 1000); // Différence en secondes
  const diffMin = Math.floor(diffSec / 60); // Différence en minutes
  const diffHour = Math.floor(diffMin / 60); // Différence en heures
  const diffDay = Math.floor(diffHour / 24); // Différence en jours

  let result: string;

  if (diffDay > 0) {
    result = `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  } else if (diffHour > 0) {
    result = `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
  } else if (diffMin > 0) {
    result = `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  } else if (diffSec > 0) {
    result = `${diffSec} second${diffSec > 1 ? "s" : ""} ago`;
  } else {
    result = "just now";
  }

  return result;
}
