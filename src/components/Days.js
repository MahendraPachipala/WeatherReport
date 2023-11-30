import React, { useState, useEffect } from "react";
import partiallyCloudyImage from "../assets/images/partially-cloudy.png";
import cloudy from "../assets/images/cloudy.png"
import rain from "../assets/images/rain.png";
export default function Days(props) {
  const [imgsrc, setimgsrc] = useState(null);

  useEffect(() => {
    if (props.img === "partly-cloudy-day") {
      setimgsrc(partiallyCloudyImage);
    }
    else if(props.img === "cloudy"){
        setimgsrc(cloudy);
    }
    else if(props.img === "rain"){
      setimgsrc(rain);
    }
  }, [props.img]);

  return (
    <div className="days">
      <div>
        <img id="icon" src={imgsrc} alt="loading..." />
      </div>
      <div>
        <p>{props.climate}</p>
      </div>
      <div>
        <p>{props.temp}°c</p>
      </div>
      <div>
        <p>
          {props.date}
        </p>
      </div>
    </div>
  );
}
