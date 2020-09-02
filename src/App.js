import React from 'react';
//import './App.css';
import 'weather-icons/css/weather-icons.css';
import Form from "./WeatherForm/form";
import Forecast from "./Forecast/Forecast";
import keys from "./keys"

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
    celcius: undefined, 
    min_temp: undefined, 
    max_temp: undefined,
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
  

  calCelcius(temp) {
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
      celcius: this.calCelcius(response.main.temp),
      min_temp: this.calCelcius(response.main.temp_max),
      max_temp: this.calCelcius(response.main.temp_min),
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
          temp_celcius={this.state.celcius}
          max_temp={this.state.max_temp}
          min_temp={this.state.min_temp}
          description={this.state.description}
          weatherIcon={this.state.icon}
          date={this.state.date} />
        </main>
        <footer>
          Page created by Dominic
        </footer>
      </div>
      );
  }
}

export default App;
