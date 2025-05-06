import cloudyIcon from "./imgs/cloudy.png";
import clearDayIcon from "./imgs/clear-day.png";
import clearNightIcon from "./imgs/clear-night.png";
import partlyCloudyDayIcon from "./imgs/partly-cloudy-day.png";
import partlyCloudyNightIcon from "./imgs/partly-cloudy-night.png";
import rainIcon from "./imgs/rain.png";
import snowIcon from "./imgs/snow.png";

const weatherDataObj = {
  value: {},
};
const daysinWeek = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

class WeatherData {
  constructor(currentConditions, description, days, address) {
    this.currentConditions = currentConditions;
    this.description = description;
    this.days = days;
    this.address = address;
  }
}

class CurrentConditionsData {
  constructor(conditions, feelslike, icon, precipprob, temp) {
    this.conditions = conditions;
    this.feelslike = feelslike;
    this.icon = icon;
    this.precipprob = precipprob;
    this.temp = temp;
  }
}

class DayData {
  constructor(tempmin, tempmax, icon) {
    this.icon = icon;
    this.tempmax = tempmax;
    this.tempmin = tempmin;
  }
}

const createWeatherDataObj = (rawData) => {
  const currentConditions = getCurrentConditionsData(
    getCurrentConditionsObj(rawData),
  );
  const newCurrentConditionsObj = createCurrentConditions(currentConditions);
  const daysData = getDaysData(getDaysArray(rawData));
  const newDaysObj = createDaysArray(daysData, getDaysArray(rawData));
  const description = getDescription(rawData);
  const address = getAddress(rawData);
  weatherDataObj.value = new WeatherData(
    newCurrentConditionsObj,
    description,
    newDaysObj,
    address,
  );
  console.log(weatherDataObj);
};

const getCurrentConditionsObj = (rawData) => {
  let currentConditions;
  for (let key in rawData) {
    if (key === "currentConditions") {
      currentConditions = rawData[key];
      break;
    }
  }
  return currentConditions;
};

const getCurrentConditionsData = (currentConditionsObj) => {
  let conditions;
  let feelslike;
  let icon;
  let precipprob;
  let temp;
  for (let key in currentConditionsObj) {
    if (key === "conditions") {
      conditions = currentConditionsObj[key];
    } else if (key === "feelslike") {
      feelslike = currentConditionsObj[key];
    } else if (key === "icon") {
      icon = currentConditionsObj[key];
    } else if (key === "precipprob") {
      precipprob = currentConditionsObj[key];
    } else if (key === "temp") {
      temp = currentConditionsObj[key];
    }
  }
  return [conditions, feelslike, icon, precipprob, temp];
};

const createCurrentConditions = (currentConditionsArray) => {
  const conditions = currentConditionsArray[0];
  const feelslike = currentConditionsArray[1];
  const icon = currentConditionsArray[2];
  const precipprob = currentConditionsArray[3];
  const temp = currentConditionsArray[4];
  const currentConditionsObj = new CurrentConditionsData(
    conditions,
    feelslike,
    icon,
    precipprob,
    temp,
  );
  return currentConditionsObj;
};

const getDaysArray = (rawData) => {
  let days;
  for (let key in rawData) {
    if (key === "days") {
      days = rawData[key];
      break;
    }
  }
  return days;
};

const getDaysData = (daysArray) => {
  const tempmins = [];
  const tempmaxs = [];
  const icons = [];
  for (let i = 0; i < 8; i++) {
    for (let key in daysArray[i]) {
      if (key === "icon") {
        icons.push(daysArray[i][key]);
      } else if (key === "tempmax") {
        tempmaxs.push(daysArray[i][key]);
      } else if (key === "tempmin") {
        tempmins.push(daysArray[i][key]);
      }
    }
  }
  return [tempmins, tempmaxs, icons];
};

const createDaysArray = (daysDataArray, rawDaysArray) => {
  const daysArray = [];
  const tempmins = daysDataArray[0];
  const tempmaxs = daysDataArray[1];
  const icons = daysDataArray[2];
  const forecastDays = getForecastDays();
  for (let i = 0; i < rawDaysArray.length; i++) {
    const dayDataObj = new DayData(tempmins[i], tempmaxs[i], icons[i]);
    const dayObj = { [forecastDays[i]]: dayDataObj };
    daysArray.push(dayObj);
  }
  return daysArray;
};

const getForecastDays = () => {
  const forecastDays = [];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  let dayName = days[today.getDay()];
  dayName = convertShortForm(dayName);
  for (let day in daysinWeek) {
    if (forecastDays.length > 0) {
      forecastDays.push(daysinWeek[day]);
    }
    if (forecastDays.length >= 8) {
      break;
    }
    if (daysinWeek[day] === dayName) {
      forecastDays.push("Today");
    }
  }
  return forecastDays;
};

const convertShortForm = (day) => {
  const shortForms = {
    Sunday: "Sun",
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
  };
  return shortForms[day] || "";
};

const getWeatherIcon = (iconPhrase) => {
  const legend = {
    cloudy: cloudyIcon,
    "clear-day": clearDayIcon,
    "clear-night": clearNightIcon,
    "partly-cloudy-day": partlyCloudyDayIcon,
    "partly-cloudy-night": partlyCloudyNightIcon,
    rain: rainIcon,
    snow: snowIcon,
  };
  return legend[iconPhrase] || "";
};

const getDescription = (rawData) => {
  let description;
  for (let key in rawData) {
    if (key === "description") {
      description = rawData[key];
      break;
    }
  }
  return description;
};

const getAddress = (rawData) => {
  let address;
  for (let key in rawData) {
    if (key === "resolvedAddress") {
      address = rawData[key];
      break;
    }
  }
  return address;
};

export { createWeatherDataObj, getWeatherIcon, weatherDataObj };
