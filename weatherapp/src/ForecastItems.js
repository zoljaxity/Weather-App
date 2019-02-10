//
//    Varsinainen taulukko, joka huolehtii kaikesta taulukon alkioille tehtavistä toimenpiteista.
//

import React, { Component } from "react";
 
class ForecastItems extends Component {

  constructor(props) {
    super(props);

    this.createForecast = this.createForecast.bind(this);
  }

  delete(key) {
    this.props.delete(key);
  }

  //    Paaavaimeksi asetaan aiemmin luoto Date.now(), minkä avulla alkiohin
  //    voidaan myohemmin viitata
  createForecast(item) {
    return <li onClick={() => this.delete(item.key)}
               key={item.key}>{item.text}</li>
  }
 
  render() {
    //    Ominaisuutena WeatherApp.js:sta saatu taulukko rakennetaan uudelleen hyodyntaen 
    //    ylla olevaa createForecast-funktiota.
    //
    //    <ul classname...> mahdollistaa luodun taulukon tulostamisen käyttäjlle selaimeen.
    var forecastEntries = this.props.entries;
    var listItems = forecastEntries.map(this.createForecast);
 
    return (
      <ul className="theForecast">
          {listItems}
      </ul>
    );
  }
};
 
export default ForecastItems;