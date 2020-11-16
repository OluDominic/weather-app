import React from 'react';
import './Forecast.css'
//import apiConfig from './keys';

const Forecast =(props)=> {
    
 const getDate=(d)=> {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  }
    return (
        <div>
            <div className="cards">
                <h1 className="wea-date">{getDate(new Date())}</h1>
                <h1 className="wea-city">
                    {props.city}
                </h1>
                <h5 className="py-4">
                    <i className={`wi ${props.weatherIcon} display-1`} />
                </h5>
                <span className="temp">
                {props.temp_celsius ? (
                    <h1 className="py-2">{props.temp_celsius}&deg;</h1>
                ) : null}
                {minmaxTemp(props.temp_min, props.temp_max)}
                </span>
                <h4 className="py-3">{props.description}</h4>
            </div>
        </div>
    );
}

function minmaxTemp(min,max) {
        if (min && max) {
            return (
                <h3>
            <span className="px-4">{min}&deg;</span><span>{" "}</span>
            <span className="px-4">{max}&deg;</span>
        </h3>
            );
        }
}

export default Forecast;