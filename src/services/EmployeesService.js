export default class EmployeesService {
  #employeesRepo;

  constructor() {
    this.#employeesRepo = {};
  }

  add(employee) {
    return new Promise((res, rej) => {
      if (this.#employeesRepo[employee.id] == undefined) {
        this.#employeesRepo = {
          ...this.#employeesRepo,
          [employee.id]: employee,
        };
        res(employee);
      } else {
        rej(`Employee with id: ${employee.id} already exists`);
      }
    });
  }

  getAll() {
    return new Promise((res) => setTimeout(() => res(Object.values(this.#employeesRepo))));
  }
}
