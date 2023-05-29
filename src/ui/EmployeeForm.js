import { getRandomEmployee } from "../util/random.js";

export default class EmployeeForm {
  #buttonElement;
  #parentElement;
  #employeeProps

  constructor(parentId, employeeProps) {
    this.#parentElement = document.getElementById(parentId);
    this.#employeeProps = employeeProps;
    this.#buildButton();
    this.#buttonElement = document.getElementById("form-button-id");
  }

  #buildButton() {
    this.#parentElement.innerHTML = `<button id="form-button-id">Add random employee</button>`;
  }

  handleAddingEmployee() {
    return new Promise((resolve) => {
      this.#buttonElement.onclick = () => resolve(getRandomEmployee(this.#employeeProps));
    });
  }
}
