const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

export function getISODateStr(date) {
  console.log(date)
  return date.toISOString().substring(0, 10);
}

export function getEndDate(startDateString, days) {
  const startDate = new Date(startDateString);
  const endDate = new Date(startDate.setDate(startDate.getDate() - 1 + +days));
  return getISODateStr(endDate);
}

export function daysBetween(start, end) {
  const startDay = new Date(start);
  const finishDay = new Date(end);
  return Math.floor((finishDay - startDay) / MILLISECONDS_IN_DAY);
}

export function getAgeByBirthyear(birhYear) {
  return new Date().getFullYear() - birhYear;
}

export function getBirthyearByAge(age) {
  return new Date().getFullYear() - age;
}
