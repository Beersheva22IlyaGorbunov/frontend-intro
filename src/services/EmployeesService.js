import { getAgeByBirthyear } from "../util/date-functions.js";
import { getRandomNumber } from "../util/random.js";
import { getOccurenciesInArr } from "../util/statistics.js";

export default class EmployeesService {
  #employeesRepo;
  #minId;
  #maxId;

  constructor(minId, maxId) {
    this.#employeesRepo = {};
    this.#minId = minId;
    this.#maxId = maxId;
  }

  add(employee) {
    return new Promise((res, rej) => {
      const id = this.#getUniqueId();
      this.#employeesRepo[id] = {
        ...employee,
        id,
      };
      res(this.#employeesRepo[id]);
    });
  }

  #getUniqueId() {
    let id;
    do {
      id = getRandomNumber(this.#minId, this.#maxId);
    } while (this.#employeesRepo.hasOwnProperty(id));
    return id;
  }

  getAll() {
    return new Promise((res) =>
      setTimeout(() => res(Object.values(this.#employeesRepo)))
    );
  }

  getStatistics(field, step) {
    let allEmployeesArr = Object.values(this.#employeesRepo);
    if (field == "age") {
      allEmployeesArr = allEmployeesArr.map((empl) => ({
        ...empl,
        age: getAgeByBirthyear(empl.birthYear),
      }));
    }
    return getOccurenciesInArr(allEmployeesArr, field, step);
  }
}
