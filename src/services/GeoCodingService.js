export default class GeoCodingService {
  #baseUrl;

  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  async #fetchCities(name) {
    const response = await fetch(this.#getUrl(name));

    if (response.ok === true) {
      return response.json();
    } else {
      throw new Error("Can't fetch data from server");
    }
  }

  #getUrl(name) {
    return `${this.#baseUrl}name=${name}`;
  }

  async getCitites(name) {
    const cities = await this.#fetchCities(name);
    // return cities.results.map((cityObj) => ({
    //   name: cityObj.name,
    //   lat: cityObj.latitude,
    //   long: cityObj.longitude
    // }))
    return cities.results
  }
}
