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

let unitMeasure = "C";
const measurementBtns = document.getElementById("measurement-btns");
const celsiusBtn = document.getElementById("celsius-btn");
const fahrenheitBtn = document.getElementById("fahrenheit-btn");
const address = document.getElementById("address-header");
const iconContainer = document.getElementById("icon-container");
const temp = document.getElementById("temp-display");
const feelslike = document.getElementById("feelslike-display");
const conditions = document.getElementById("conditions-display");
const precipProb = document.getElementById("precipprob-display");
const description = document.getElementById("description-display");
const forecast = document.getElementById("forecast-container");

const initialize = () => {
  celsiusBtn.classList.toggle("measurement-active", true);
  activateMeasureBtns();
};

const activateMeasureBtns = () => {
  measurementBtns.addEventListener("click", (event) => {
    celsiusBtn.classList.toggle("measurement-active", false);
    fahrenheitBtn.classList.toggle("measurement-active", false);
    if (event.target.id === "celsius-btn") {
      unitMeasure = "C";
      celsiusBtn.classList.toggle("measurement-active", true);
    } else if (event.target.id === "fahrenheit-btn") {
      unitMeasure = "F";
      fahrenheitBtn.classList.toggle("measurement-active", true);
    }
    clearDisplay();
    displayData();
  });
};

const convertToFahrenheit = (temp) => {
  return temp * (9 / 5) + 32;
};

const roundToInteger = (temp) => {
  return Math.round(temp);
};

const convertToDisplay = (temp) => {
  if (unitMeasure === "F") {
    temp = convertToFahrenheit(temp);
  }
  temp = roundToInteger(temp);
  return temp;
};

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

const clearDisplay = () => {
  iconContainer.textContent = "";
  forecast.textContent = "";
};

const displayAddress = () => {
  address.textContent = getAddress();
};

const displayIcon = () => {
  const currentWeatherIcon = document.createElement("img");
  currentWeatherIcon.src = getCurrentIconSrc();
  currentWeatherIcon.alt = getCurrentIconAlt();
  currentWeatherIcon.id = "current-weather-icon";
  iconContainer.appendChild(currentWeatherIcon);
};

const displayTemp = () => {
  let rawTemp = getTemp();
  let cleanTemp = convertToDisplay(rawTemp);
  temp.textContent = `${cleanTemp}°${unitMeasure}`;
};

const displayFeelslike = () => {
  let rawFeelslike = getFeelslike();
  let cleanFeelslike = convertToDisplay(rawFeelslike);
  feelslike.textContent = `Feelslike: ${cleanFeelslike}°${unitMeasure}`;
};

const displayConditions = () => {
  conditions.textContent = getConditions();
};

const displayPrecipProb = () => {
  let rawPrecipProb = getPrecipProb();
  if (rawPrecipProb === 0) {
    precipProb.textContent = "No chance of rain";
  } else {
    precipProb.textContent = `${roundToInteger(rawPrecipProb)}% chance of rain`;
  }
};

const displayDescription = () => {
  description.textContent = getDescription();
};

const displayForecast = () => {
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
    const rawTempLow = getTempMin(i, dayName);
    const cleanTempLow = convertToDisplay(rawTempLow);
    const rawTempHigh = getTempMax(i, dayName);
    const cleanTempHigh = convertToDisplay(rawTempHigh);
    highLowCell.textContent = `Low: ${cleanTempLow}°${unitMeasure} --- High: ${cleanTempHigh}°${unitMeasure}`;
  }
};

export { displayData, clearDisplay, initialize };
