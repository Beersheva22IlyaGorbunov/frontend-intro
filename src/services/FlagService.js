export default class FlagService {
  getFlagByCountryCode(countryCode) {
    return `https://hatscripts.github.io/circle-flags/flags/${countryCode}.svg`
  }
}