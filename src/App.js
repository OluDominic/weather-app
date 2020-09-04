import React from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import Form from "./WeatherForm/form";
import Forecast from "./Forecast/Forecast";
import keys from "./keys"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

const api = {
  key: keys.API_KEY
}
//api call api.openweathermap.org/data/2.5/weather?q=London,uk

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= { city: undefined, 
    country: undefined,
    date: new Date().toLocaleString(),
    icon: undefined,
    main:undefined, 
    celsius: undefined, 
    temp_max: undefined, 
    temp_min: undefined,
    description: "",
    error: false};
    this.weatherIcon= {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sweet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }
  

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_WeatherIcon(icons, rangeID) {
    switch (true) {
      case rangeID >=200 && rangeID <=232:
        this.setState({icon: this.weatherIcon.Thunderstorm})
        break;
      case rangeID >=300 && rangeID<=321:
        this.setState({icon: this.weatherIcon.Drizzle})
        break;
      case rangeID >=500 && rangeID<=531:
        this.setState({icon: this.weatherIcon.Rain})
        break;
      case rangeID >=600 && rangeID<=622:
        this.setState({icon: this.weatherIcon.Snow})
        break;
      case rangeID >=701 && rangeID<=781:
        this.setState({icon: this.weatherIcon.Atmosphere})
        break;
      case rangeID === 800:
        this.setState({icon: this.weatherIcon.Clear})
        break;
      case rangeID >=801 && rangeID<=804:
        this.setState({icon:this.weatherIcon.Clouds})
      default:
        this.setState({icons: this.weatherIcon.Clouds})
    }
  }

  getWeather = async(e)=> {

    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api.key}`);

    const response = await api_call.json();
    console.log(response);

    this.setState({
      city: `${response.name}, ${response.sys.country}`,
      celsius: this.calCelsius(response.main.temp),
      temp_min: this.calCelsius(response.main.temp_min),
      temp_max: this.calCelsius(response.main.temp_max),
      description: response.weather[0].description,
      error: false
    })

    this.get_WeatherIcon(this.weatherIcon, response.weather[0].id)
    } else {
      this.setState({error: true})
    }
  }
  render() {
    return (
      <div className="App">
        <main>
          <Form loadweather={this.getWeather} 
          error={this.state.error}
          />
          <Forecast city={this.state.city} 
          country={this.state.country} 
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
          date={this.state.date} />
        </main>
        <footer className="foot">
          Page created by Dominic <span>
            <FontAwesomeIcon icon={faCopyright} />
          </span> 2020.
        </footer>
      </div>
      );
  }
}

export default App;
