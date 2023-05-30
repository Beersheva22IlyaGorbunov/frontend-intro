import EmployeesService from "./services/EmployeesService.js";
import ApplicationBar from "./ui/AppicationBar.js";
import DataGrid from "./ui/DataGrid.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import appConfig from "./config/app-config.json" assert { "type": "json" };
import NotificationBar from "./ui/NotificationsBar.js";

// Employee model
// {id: number of 9 digits, name: string, birthYear: number, gender: female | male,
// salary: number, department: QA, Development, Audit, Accounting, Management}

// Constants
// ID's
const MENU_PLACE_ID = "menu-place";
const EMPLOYEE_FORM_PLACE_ID = "employees-form-place";
const EMPLOYEE_GRID_PLACE_ID = "employees-table-place";
const STATISTICS_GRID_PLACE_ID = "statistics-place";
const AGE_STATISTICS_PLACE_ID = "age-statistics-place";
const SALARY_STATISTICS_PLACE_ID = "salary-statistics-place";

// Settings
const NOTIFICATION_DISPLAY_TIME_SECONDS = 3;
const EMPLOYEE_COLUMNS = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "birthYear", headerName: "Birth Year" },
  { field: "gender", headerName: "Gender" },
  { field: "salary", headerName: "Salary (ILS)" },
  { field: "department", headerName: "Department" },
];
const AGE_STATISTICS_COLUMNS = [
  { field: "min", headerName: "Age from" },
  { field: "max", headerName: "Age to" },
  { field: "amount", headerName: "Amount" },
];
const SALARY_STATISTICS_COLUMNS = [
  { field: "min", headerName: "Salary from" },
  { field: "max", headerName: "Salary to" },
  { field: "amount", headerName: "Amount" },
];
const SECTIONS = [
  {
    title: "Add employee",
    id: "employees-form-place",
  },
  {
    title: "Employees",
    id: "employees-table-place",
  },
  {
    title: "Statistics",
    id: "statistics-place",
  },
];

const statisticsElement = document.getElementById(STATISTICS_GRID_PLACE_ID);
statisticsElement.innerHTML = `
  <div id="${AGE_STATISTICS_PLACE_ID}"></div>
  <div id="${SALARY_STATISTICS_PLACE_ID}"></div>
`;

const employeesService = new EmployeesService(appConfig.minId, appConfig.maxId);

const applicationBar = new ApplicationBar(
  MENU_PLACE_ID,
  SECTIONS,
  handleSectionChanging
);
const employeesTable = new DataGrid(EMPLOYEE_GRID_PLACE_ID, EMPLOYEE_COLUMNS);
const employeeForm = new EmployeeForm(
  EMPLOYEE_FORM_PLACE_ID,
  appConfig.employeeProperties
);
const ageStatisticsTable = new DataGrid(
  AGE_STATISTICS_PLACE_ID,
  AGE_STATISTICS_COLUMNS
);
const salaryStatisticsTable = new DataGrid(
  SALARY_STATISTICS_PLACE_ID,
  SALARY_STATISTICS_COLUMNS
);
const notificationBar = new NotificationBar(NOTIFICATION_DISPLAY_TIME_SECONDS);

async function runAddEmployeeEvent() {
  while (true) {
    const newEmployee = await employeeForm.handleAddingEmployee();

    const addedEmpl = await employeesService.add(newEmployee);
    notificationBar.displayMessage(
      addedEmpl.id,
      "Employee has been added",
      addedEmpl.toString()
    );
    employeesTable.insertRow(addedEmpl);
  }
}

function handleSectionChanging(index) {
  if (SECTIONS[index].id == STATISTICS_GRID_PLACE_ID) {
    updateStatistics();
  }
}

function updateStatistics() {
  const ageStatistics = employeesService.getStatistics("age", 10);
  ageStatisticsTable.fillData(ageStatistics);

  const salaryStatistics = employeesService.getStatistics("salary", 1000);
  salaryStatisticsTable.fillData(salaryStatistics);
}

runAddEmployeeEvent();
