import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import WeatherApp from "./WeatherApp";
  
var destination = document.querySelector("#container");
  
ReactDOM.render(
    <div>
         <h1>Alma-Media Weather App</h1>
         <p>Hae haluamasi paikkakunnan säätiedot syöttämällä kaupunki ja maa..</p>
         <WeatherApp/>
    </div>,
    destination
);