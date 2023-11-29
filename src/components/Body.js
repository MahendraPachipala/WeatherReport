import React, { useState, useEffect } from "react";
import Days from "./Days";
import axios from "axios";
import searchvalue from "./Header";

export default function Body({city}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=6BHXV54C28F5FRDLHZ8T46ARU&contentType=json`);
        setData(response.data);
        console.log(searchvalue);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const climate = data.days[0].conditions;
  const temp = data.days[0].temp;

  return (
    <div className="templates">
    <div className="today">
     <h3>Today in {data.resolvedAddress}</h3>
      <Days img={data.days[0].icon} climate={climate} temp={temp} />
    </div>
      <Days img={data.days[1].icon} climate={data.days[1].conditions} temp={data.days[1].temp} />
      <Days img={data.days[2].icon} climate={data.days[2].conditions} temp={data.days[2].temp} />
      <Days img={data.days[3].icon} climate={data.days[3].conditions} temp={data.days[3].temp} />
      <Days img={data.days[4].icon} climate={data.days[4].conditions} temp={data.days[4].temp} />
      <Days img={data.days[5].icon} climate={data.days[5].conditions} temp={data.days[5].temp} />
      <Days img={data.days[6].icon} climate={data.days[6].conditions} temp={data.days[6].temp} />
      <Days img={data.days[7].icon} climate={data.days[7].conditions} temp={data.days[7].temp} />

      

    </div>
  );
}
