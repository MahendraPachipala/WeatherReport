import React, { useState, useEffect } from "react";
import Days from "./Days";
import axios from "axios";
import "../App.css";

export default function Body({ city }) {
  const [data, setData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get geolocation
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const location = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=e7cbec4493a84f6b89744cb2d587f992`
        );

        const village = location.data.results[0].components.village;
        const state = location.data.results[0].components.state;
        const dist = location.data.results[0].components.state_district;
        const curLocation = `${village},${dist},${state}`;
        setWeather(city === "" ? curLocation : city);

        // Fetch weather data
        const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weather}?unitGroup=metric&key=6BHXV54C28F5FRDLHZ8T46ARU&contentType=json`
        );

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [weather, city]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const climate = data.days[0].conditions;
  const temp = data.days[0].temp;

  return (
    <div className="templates">
      <div className="today">
        <h3>Today in {data.resolvedAddress}</h3>
        <Days img={data.days[0].icon} climate={climate} temp={temp} date="Today" />
      </div>

      <div id="container">
        <h2 id="week">Weekly Forecast</h2>
        {data.days.slice(1,7).map((day) => (
          <Days key={day.datetime} img={day.icon} climate={day.conditions} temp={day.temp} date={day.datetime} />
        ))}
      </div>
    </div>
  );
}
