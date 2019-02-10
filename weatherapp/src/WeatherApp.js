import React, { Component } from "react";
import ForecastItems from "./ForecastItems";
import "./WeatherApp.css";

class WeatherApp extends Component {
   // Luodaan tilallinen taulukko, johon säätiedot tallennetaan.
   constructor(props) {
      super(props);

      this.state = {
         items: []
      };

      this.showWeather = this.showWeather.bind(this);
      this.deleteForecast = this.deleteForecast.bind(this);
   }

   showWeather = async(e) => {

      //    preventDefault estää selaimen automaattisen sivun päivittämisen.
      e.preventDefault();

      const city = this._inputCity.value;
      const country = this._inputCountry.value;

      if (this._inputCity.value !== "" && this._inputCountry.valuea !== "") {

         //    newItemiin tallenetaan oliomme, joka sisaltaa sekä kauapungin, maan ja lampotilan että 
         //    sen hetkisen ajan.
         //    newItemiin oli tarkoitus tallentaa response.main.temp lämpötilan arvona, 
         //    mutta näin tehtaessä API-kutsusta tulee virheilmoitus, jonka mukaan kutsu on luvaton.
         var newItem = {
            text: city + ", " + country + ": " + "Kylmää & märkää",
            key: Date.now()
         };

         //    Tilassa oleva taulukko korvataan kyseisella taulukolla, 
         //    johon on lisatty uusin saakysely.
         this.setState((prevState) => {
            return {
               items: prevState.items.concat(newItem)
            };
         });
         this._inputCity.value = "";
         this._inputCountry.value = "";
      }
      console.log(this.state.items);
   }

   //    Parametrina saatavaa avainta verrataan kaikkiin taulukossa oleviin avaimiin. deleteForecast
   //    luo uuden taulukon, johon talleneetaan kaikki muut paitsi juuri loydetty paaavaimen monikko.
   deleteForecast(key) {
      var filteredItems = this.state.items.filter(function (item) {
         return (item.key !== key);
      });
      //    Luomamme taulukko tallennetaan varsinaisen taulukkomme paalle.
      this.setState({
         items: filteredItems
      });
   }
   //    onSubmit reagoin "Hae saatiedot" -napin klikkaukseen ja kutsuu showWeatheria.
   //    ref-lausekkeet toimivat viitteinä _input-elementeille, jolloin käyttäjän syottamiin arvoihin
   //    paastaan kasiksi hyodyntamalla _input:teja.
   //
   //    ForecastItemsille syotetaan ominaisuutena items-taulukkomme.
   //    Lisaksi taulukkoon on sidottu ominaisuus delete, jolla saatietoja voi poistaa.
   render() {
      return (
         <div className="weatherAppMain">
            <div className="header">
               <form onSubmit={this.showWeather}>
                  <input ref={(a) => this._inputCity = a }
                  placeholder="Kaupunki...">
                  </input>
                  <input ref={(b) => this._inputCountry = b }
                  placeholder="Maa...">
                  </input>
                  <button type="submit">Hae säätiedot</button>
               </form>
            </div>
            <ForecastItems entries={this.state.items}
                           delete={this.deleteForecast}/>
         </div>
      );
   }
}
 
export default WeatherApp;

//
//    Osa vaihtoehtoista yritystä, jossa taulukkoon tallennettavat sää tiedot 
//    haettaisiin openweatheriltä. Ei toimi.
//
/*
import React, { Component } from "react";
import ForecastItems from "./ForecastItems";
import "./WeatherApp.css";

const Api_Key = "71f752a577423e8f624320dcb636ec18";

class WeatherApp extends Component {
   constructor(props) {
      super(props);

      this.state = {
         items: []
      };

      this.showWeather = this.showWeather.bind(this);
      this.deleteForecast = this.deleteForecast.bind(this);
   }

   state = {

      temperature: undefined,
      city: undefined,
      country: undefined,
      error: undefined
    }

   showWeather = async(e) => {
      e.preventDefault();

      const city = this._inputCity.value;
      const country = this._inputCountry.value;

      const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}');
      const response = await api_call.json();

      var temperature2: response.main.temp;

//    Lämpötilana oli tarkoitus näyttää response.main.temp arvo, mutta API-kutsua en saa toimimaan.
      if (this._inputCity.value !== "" && this._inputCountry.valuea !== "") {

        var newItem = {
         text: city + ", " + country + ": " + temperature2,
         key: Date.now()
      };

      this.setState((prevState) => {
         return {
            items: prevState.items.concat(newItem)
         };
      });
      this._inputCity.value = "";
      this._inputCountry.value = "";
   }
   console.log(this.state.items);
}

deleteForecast(key) {
   var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
   });
   
   this.setState({
      items: filteredItems
   });
}

render() {
   return (
      <div className="weatherAppMain">
         <div className="header">
            <form onSubmit={this.showWeather}>
               <input ref={(a) => this._inputCity = a }
               placeholder="Kaupunki...">
               </input>
               <input ref={(b) => this._inputCountry = b }
               placeholder="Maa...">
               </input>
               <button type="submit">Hae säätiedot</button>
            </form>
         </div>
         <ForecastItems entries={this.state.items}
                        delete={this.deleteForecast}/>
      </div>
   );
}
}

export default WeatherApp;v
*/