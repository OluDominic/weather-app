import React from 'react';
import './form.css';

const Form =props=> {
    return(
        <div>
            <div>{props.error ? error() : null}</div>
            <form onSubmit={props.loadweather}>
            <div>
                <div className="location-whole"> 
                <div>
                    <input type="text" 
                    className="location"
                    name="city"
                    autoComplete="off"
                    placeholder="City"
                    />
                </div>
                <div>
                    <input type="text" 
                    className="location"
                    name="country"
                    autoComplete="off"
                    placeholder="Country"
                    />
                </div>
                </div>
                <div className="btn">
                    <button className="btn-wea">
                        Get Weather
                    </button>
                </div>
            </div>
            </form>
        </div>
    );
}

function error() {
    return (
        <div>
            Please Enter City and Country
        </div>
    );
}

export default Form;