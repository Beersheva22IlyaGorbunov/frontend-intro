export default class OpenMeteoService {
  #baseUrl;

  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  async #fetchTemperatures(lat, long, startDate, endDate) {
    const response = await fetch(this.#getUrl(lat, long, startDate, endDate));

    if (response.ok === true) {
      return response.json();
    } else {
      throw new Error("Can't fetch data from server");
    }
  }

  #getUrl(lat, long, startDate, endDate) {
    return `${
      this.#baseUrl
    }latitude=${lat}&longitude=${long}&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m,apparent_temperature&timezone=IST`;
  }

  async getTemperatures({lat, long, startDate, endDate, hourFrom, hourTo}) {
    const fetchedData = await this.#fetchTemperatures(
      lat,
      long,
      startDate,
      endDate
    );
    const hourlyForecast = fetchedData.hourly;
    return filterByHour(hourlyForecast, hourFrom, hourTo);
  }
}

function filterByHour(hourlyForecast, hourFrom, hourTo) {
  const filteredForecast = hourlyForecast.time.reduce(
    (accum, forecastDateTime, index) => {
      const hourNum = index % 24;
      if (hourNum >= hourFrom && hourNum <= hourTo) {
        const token = forecastDateTime.split("T");
        const forecastDate = token[0];
        const forecastHour = token[1];
        accum.push({
          date: forecastDate,
          time: forecastHour,
          temperature: hourlyForecast.temperature_2m[index],
          apparentTemperature: hourlyForecast.apparent_temperature[index],
        });
      }
      return accum;
    },
    []
  );
  return filteredForecast;
}
