const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// getDate dll mengembalikan local time

export const getDate = (time: string): string => {
  const date = new Date(time);
  const dateNumber = date.getDate();
  const monthName = month[date.getMonth()];
  const yearNumber = date.getFullYear();
  return `${dateNumber} ${monthName} ${yearNumber}`;
};

export const getTime = (time: string): string => {
  const date = new Date(time);
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minute}`;
};
