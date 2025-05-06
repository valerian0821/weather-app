import { weatherDataObj, getWeatherIcon } from "./data.js";

const getAddress = () => {
  return weatherDataObj.value.address;
};

const getCurrentIconSrc = () => {
  return getWeatherIcon(weatherDataObj.value.currentConditions.icon);
};

const getCurrentIconAlt = () => {
  return weatherDataObj.value.currentConditions.icon;
};

const getTemp = () => {
  return weatherDataObj.value.currentConditions.temp;
};

const getFeelslike = () => {
  return weatherDataObj.value.currentConditions.feelslike;
};

const getConditions = () => {
  return weatherDataObj.value.currentConditions.conditions;
};

const getPrecipProb = () => {
  return weatherDataObj.value.currentConditions.precipprob;
};

const getDescription = () => {
  return weatherDataObj.value.description;
};

const getDayName = (dayIndex) => {
  return Object.keys(weatherDataObj.value.days[dayIndex])[0];
};

const getDayIconSrc = (dayIndex, dayName) => {
  return getWeatherIcon(weatherDataObj.value.days[dayIndex][dayName].icon);
};

const getDayIconAlt = (dayIndex, dayName) => {
  return weatherDataObj.value.days[dayIndex][dayName].icon;
};

const getTempMin = (dayIndex, dayName) => {
  return weatherDataObj.value.days[dayIndex][dayName].tempmin;
};

const getTempMax = (dayIndex, dayName) => {
  return weatherDataObj.value.days[dayIndex][dayName].tempmax;
};

export {
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
};
