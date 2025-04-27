const location = "markham";

const fetchData = async () => {
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
  }
};

export { fetchData };
