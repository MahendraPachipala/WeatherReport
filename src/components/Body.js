import React, { useState, useEffect } from "react";
import Days from "./Days";
import axios from "axios";
import "../App.css";

export default function Body({ city }) {
  const [data, setData] = useState(null);
  let curlocation = ""; 
  const[weather,setweather]=useState(null);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation not supported");
  }

  async function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    try {
      const location = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=e7cbec4493a84f6b89744cb2d587f992`
      );
      const village = location.data.results[0].components.village;
      const state = location.data.results[0].components.state;
      curlocation = village + "," + state;
      const wea = city === "" ? curlocation : city;
      setweather(wea);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  }
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weather}?unitGroup=metric&key=6BHXV54C28F5FRDLHZ8T46ARU&contentType=json`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [weather]);

  if (!data) {
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

      <div>
        <h2 id="week">Weekly Forecast</h2>
        <Days img={data.days[1].icon} climate={data.days[1].conditions} temp={data.days[1].temp} date = {data.days[1].datetime} />
      <Days img={data.days[2].icon} climate={data.days[2].conditions} temp={data.days[2].temp} date = {data.days[1].datetime}/>
      <Days img={data.days[3].icon} climate={data.days[3].conditions} temp={data.days[3].temp} date = {data.days[1].datetime}/>
      <Days img={data.days[4].icon} climate={data.days[4].conditions} temp={data.days[4].temp} date = {data.days[1].datetime}/>
      <Days img={data.days[5].icon} climate={data.days[5].conditions} temp={data.days[5].temp} date = {data.days[1].datetime}/>
      <Days img={data.days[6].icon} climate={data.days[6].conditions} temp={data.days[6].temp} date = {data.days[1].datetime}/>
      </div>
    </div>
  );
}
