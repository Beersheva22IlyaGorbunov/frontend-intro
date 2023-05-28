export function getIsoDateStr(date) {
  return date.toISOString().substring(0, 10);
}

export function getEndDate(startDateStr, days) {
  const startDate = new Date(startDateStr);
  startDate.setDate(startDate.getDate() + days - 1);
  return getIsoDateStr(startDate);
}