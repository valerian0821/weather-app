import {
  getAddress,
  getTemp,
  getFeelslike,
  getConditions,
  getPrecipProb,
  getDescription,
  getCurrentIconSrc,
  getCurrentIconAlt,
  getDayName,
  getDayIconSrc,
  getDayIconAlt,
  getTempMin,
  getTempMax,
} from "./dataaccess.js";

const displayData = () => {
  displayAddress();
  displayIcon();
  displayTemp();
  displayFeelslike();
  displayConditions();
  displayPrecipProb();
  displayDescription();
  displayForecast();
};

const displayAddress = () => {
  const address = document.getElementById("address-header");
  address.textContent = getAddress();
};

const displayIcon = () => {
  const iconContainer = document.getElementById("icon-container");
  const currentWeatherIcon = document.createElement("img");
  currentWeatherIcon.src = getCurrentIconSrc();
  currentWeatherIcon.alt = getCurrentIconAlt();
  currentWeatherIcon.id = "current-weather-icon";
  iconContainer.appendChild(currentWeatherIcon);
};

const displayTemp = () => {
  const temp = document.getElementById("temp-display");
  temp.textContent = getTemp();
};

const displayFeelslike = () => {
  const feelslike = document.getElementById("feelslike-display");
  feelslike.textContent = getFeelslike();
};

const displayConditions = () => {
  const conditions = document.getElementById("conditions-display");
  conditions.textContent = getConditions();
};

const displayPrecipProb = () => {
  const precipProb = document.getElementById("precipprob-display");
  precipProb.textContent = getPrecipProb();
};

const displayDescription = () => {
  const description = document.getElementById("description-display");
  description.textContent = getDescription();
};

const displayForecast = () => {
  const forecast = document.getElementById("forecast-container");
  for (let i = 0; i < 8; i++) {
    //Column 1: Day of Week
    const dayofWeekCell = document.createElement("div");
    const dayName = getDayName(i);
    dayofWeekCell.textContent = dayName;
    forecast.appendChild(dayofWeekCell);

    //Column 2: Weather Icon
    const weatherIconCell = document.createElement("div");
    forecast.appendChild(weatherIconCell);
    const weatherIcon = document.createElement("img");
    weatherIcon.src = getDayIconSrc(i, dayName);
    weatherIcon.alt = getDayIconAlt(i, dayName);
    weatherIcon.classList.add("forecast-icon");
    weatherIconCell.appendChild(weatherIcon);

    //Column 3: Temp High-Lows
    const highLowCell = document.createElement("div");
    forecast.appendChild(highLowCell);
    const tempLow = getTempMin(i, dayName);
    const tempHigh = getTempMax(i, dayName);
    highLowCell.textContent = `Low:${tempLow} High:${tempHigh}`;
  }
};

export { displayData };
