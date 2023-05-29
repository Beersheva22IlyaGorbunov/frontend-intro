import OpenMeteoService from "./services/OpenMeteoService.js";
import openMeteoConfig from "./config/service-config.json" assert { type: "json" };
import DataGrid from "./ui/DataGrid.js";
import WeatherForm from "./ui/WeatherForm.js";
import { getEndDate } from "./util/date-functions.js";
import GeoCodingService from "./services/GeoCodingService.js";

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

const dataGrid = new DataGrid(TABLE_PLACE_ID, COLUMN_NAMES);
const openMeteoService = new OpenMeteoService(openMeteoConfig.weatherBaseUrl);
const geoCodingService = new GeoCodingService(openMeteoConfig.citiesBaseUrl);
const weatherForm = new WeatherForm(
  FORM_PLACE_ID,
  openMeteoConfig.maxDays,
  geoCodingService
);

async function getFormAndFetch() {
  while (true) {
    const fromFormData = await weatherForm.getFormData();

    const requestParams = {
      ...fromFormData,
      endDate: getEndDate(fromFormData.startDate, fromFormData.days),
    };

    const forecastData = await openMeteoService.getTemperatures(requestParams);
    dataGrid.fillData(forecastData);
  }
}

getFormAndFetch();
