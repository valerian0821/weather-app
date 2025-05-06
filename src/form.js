import { createWeatherDataObj } from "./data.js";
import { displayData } from "./DOM.js";

const form = document.querySelector("form");
const locationInput = document.getElementById("location");
const locationErrorMsg = document.querySelector("span");

const activateForm = () => {
  locationInput.addEventListener("input", () => {
    if (
      locationInput.checkValidity() &&
      isOnlyLettersandSpaces(locationInput.value)
    ) {
      locationErrorMsg.textContent = "";
      locationErrorMsg.classList.toggle("error", false);
    } else {
      showError();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (
      !locationInput.checkValidity() ||
      !isOnlyLettersandSpaces(locationInput.value)
    ) {
      showError();
    } else {
      handleFormData(locationInput.value);
    }
  });
};

const showError = () => {
  if (locationInput.validity.valueMissing) {
    locationErrorMsg.textContent = "Please enter a location.";
  } else if (
    !locationInput.validity.valid ||
    !isOnlyLettersandSpaces(locationInput.value)
  ) {
    locationErrorMsg.textContent = "Please enter a valid location.";
  } else {
    locationErrorMsg.textContent = "The location does not exist";
  }
  locationErrorMsg.classList.toggle("error", true);
};

const isOnlyLettersandSpaces = (str) => {
  return /^[a-zA-Z\s]*$/.test(str);
};

const fetchData = async (location) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&key=E5LPWLUMVFM3W9RXLGQFBBPKP&contentType=json`,
      { mode: "cors" },
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch {
    console.log("ERROR!");
    return null;
  }
};

const handleFormData = async (location) => {
  const rawData = await fetchData(location);
  if (!rawData || Object.keys(rawData).length === 0) {
    showError();
  } else {
    createWeatherDataObj(rawData);
    displayData();
  }
};

export { fetchData, activateForm, handleFormData };
