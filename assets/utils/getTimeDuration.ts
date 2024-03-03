export default function getTimeDuration(d:string) {
  const date = new Date(d);
  const currentDate = new Date();
  const diff = currentDate.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  if (years > 0) {
    return `${years} years ago`;
  } else if (months > 0) {
    return `${months} months ago`;
  } else if (days > 0) {
    return `${days} days ago`;
  } else {
    return "today";
  }
}

