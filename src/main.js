import OpenMeteoService from "./services/OpenMeteoService.js";
import openMeteoConfig from "./config/service-config.json" assert { type: "json" };
import DataGrid from "./ui/DataGrid.js";
import { getIsoDateStr, getEndDate } from "./util/date-functions.js";
import WeatherForm from "./ui/WeatherForm.js";

// Constants
const TABLE_PLACE_ID = "table-place";
const COLUMN_NAMES = [
  { field: "date", headerName: "Date" },
  { field: "time", headerName: "Time" },
  { field: "temperature", headerName: "Temperature" },
  { field: "apparentTemperature", headerName: "Feels like" },
];

const FORM_PLACE_ID = "form-place";

// Objects
const fromFormData = {
  city: "Rehovot",
  startDate: getIsoDateStr(new Date()),
  days: 5,
  hourFrom: 12,
  hourTo: 15,
};

const requestParams = {
  lat: openMeteoConfig.cities[fromFormData.city].lat,
  long: openMeteoConfig.cities[fromFormData.city].long,
  startDate: fromFormData.startDate,
  endDate: getEndDate(fromFormData.startDate, fromFormData.days),
  hourFrom: fromFormData.hourFrom,
  hourTo: fromFormData.hourTo,
};

const dataGrid = new DataGrid(TABLE_PLACE_ID, COLUMN_NAMES);
const openMeteoService = new OpenMeteoService(openMeteoConfig.baseUrl);
const weatherForm = new WeatherForm(FORM_PLACE_ID, 
  Object.keys(openMeteoConfig.cities), 
  openMeteoConfig.maxDays)

weatherForm.submitForm()
  .then((formData) => {
    console.log(formData)
  })
openMeteoService
  .getTemperatures(requestParams)
  .then((res) => dataGrid.fillData(res));


