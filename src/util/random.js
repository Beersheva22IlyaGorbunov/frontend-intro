import { getBirthyearByAge } from "./date-functions.js";

export function getRandomNumber(min, max) {
  if (min == max) {
    max++;
  } else if (min > max) {
    [min, max] = [max, min];
  }
  return Math.trunc(Math.random() * (max - min) + min);
}

export function getRandomElement(array) {
  return array[getRandomNumber(0, array.length)];
}

export function getRandomEmployee({
  departments,
  minSalary,
  maxSalary,
  minAge,
  maxAge,
}) {
  const minBirthYear = getBirthyearByAge(maxAge);
  const maxBirthYear = getBirthyearByAge(minAge);
  const gender = getRandomGender();
  return {
    id: getRandomNumber(100000, 1000000),
    name: gender === "male" ? getRandomMaleName() : getRandomFemaleName(),
    birthYear: getRandomNumber(minBirthYear, maxBirthYear),
    gender: gender,
    salary: getRandomNumber(minSalary, maxSalary),
    department: getRandomElement(departments),
    toString: function() {
      return `id: ${this.id}, name: ${this.name}, birth year: ${this.birthYear}, 
        gender: ${this.gender}, salary: ${this.salary}, department: ${this.department}`
    }
  };
}

export function getRandomMaleName() {
  return getRandomElement([
    "James",
    "John",
    "William",
    "Michael",
    "David",
    "Daniel",
    "Robert",
    "Joseph",
    "Christopher",
    "Matthew",
  ]);
}

export function getRandomFemaleName() {
  return getRandomElement([
    "Mary",
    "Jennifer",
    "Linda",
    "Susan",
    "Sarah",
    "Karen",
    "Emily",
    "Jessica",
    "Elizabeth",
    "Michelle",
  ]);
}

export function getRandomGender() {
  return getRandomNumber(0, 2) == 0 ? "male" : "female";
}
