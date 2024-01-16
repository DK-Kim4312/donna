import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

export const formatDateTime = (dateTimeString) => {
  // Implement a date-time formatting function
  // Example: return new Date(dateTimeString).toLocaleString();
};

export const transformEvents = (events) => {
  const eventMap = {};
  events.forEach(event => {
      const date = event.date;
      if (!eventMap[date]) {
          eventMap[date] = [];
      }
      eventMap[date].push(event);
  });
  return eventMap;
};
``
