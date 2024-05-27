export function getFormattedDate(date) {
  // * "getMonth" gives 0 to January so to get the exact month number, we would need to add 1
  // const month = date.getMonth() + 1

  // return `${ date.getFullYear() }-${ month }-${ date.getDate() }`;

  return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}