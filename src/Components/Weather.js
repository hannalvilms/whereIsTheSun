import React from 'react';
import '.././style.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import {useHistory} from "react-router-dom";
import {Icon} from "@iconify/react";

export default function Weather(input) {

    let i = 0;
    //redirect to homepage
    const browserHistory = useHistory();
    const redirect = (e) => {
        e.stopPropagation()
        browserHistory.push("/home");
    }

    //get time
    const today = new Date(),
    time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    //days
    const days = ['Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    //define wind direction
    const getWindDirection = (deg) => {
        if (deg>=0 && deg<22.5){
            return "N";
        }else if (deg>=22.5 && deg<67.5){
            return "NE";
        }else if (deg>=67.5 && deg<112.5){
            return "E";
        }else if (deg>=112.5 && deg<157.5){
            return "SE";
        }else if (deg>=157.5 && deg<202.5){
            return "S";
        }else if (deg>=202.5 && deg<247.5){
            return "SW";
        }else if (deg>=247.5 && deg<292.5){
            return "W";
        }else if (deg>=292.5 && deg<337.5){
            return "NW";
        }else if (deg>=337.5 && deg<=360){
            return "N";
        }
    }

    //define current weather and set icons
    const weatherIcon = (sky) => {
        if (sky === 'Rain'){
            return <Icon icon="fluent:weather-rain-24-filled" />
        } else if (sky === 'Clouds'){
            return <Icon icon="bi:cloud-fill" />
        } else if (sky === 'Clear'){
            return <Icon icon="clarity:sun-solid" />
        } else if (sky === 'Thunderstorm'){
            return <Icon icon="ion:thunderstorm" />
        } else if (sky === 'Snow'){
            return <Icon icon="bi:cloud-snow-fill" />
        } else if (sky === 'Mist'){
            return <Icon icon="ri:mist-fill" />
        } else {
            return <Icon icon="bi:cloud-fill" />
        }
    }

    //change location icon
    const changeIcon = () => {
        if(input.location.state.result.name) {
            return <Icon icon="fluent:location-28-filled" />
        } else {
            return <Icon icon="fluent:location-28-regular" />
        }
    }

    return (
        <div className="results">
            <div className=' col-lg-12'>
                <div className='logo'>
                    <h1 className='waldo'>Where is Waldo</h1>
                    <h2 className='sun'>the sun</h2>
                    <hr/>
                </div>
            </div>
    {/* input */}
            <div className='weather-search-bar col-12'>
                <div className="search-box">
                    <div className='input-container col-12'>
                        <Icon icon="eva:arrow-back-fill" className="back-icon" onClick={redirect}/>
                        {changeIcon()}
                        <input
                            className="col-9"
                            type="text"
                            placeholder={input.location.state.result.name}
                            value={input.location.state.result.name}
                            onChange={redirect}
                            onKeyPress={redirect}
                        />
                        {input.location.state.result.name !== 0 && (
                            <h6 onClick={redirect}>Clear</h6>
                        )}
                    </div>
                </div>
            </div>
    {/* weather right now */}
            <div className="forecast col-12">
            {(typeof input.history.location.state.result.main !== "undefined") ? (
                <div className="today-box col-12">
                    <div className="col-lg-12 col-md-6 today">
                        <div className="col-1">
                            <div className="today-icon">
                                {weatherIcon(input.location.state.result.weather[0].main)}
                            </div>
                        </div>
                        <div className="col-5">
                            <h1>Today</h1>
                            <div className="updated-time">
                                <h2>{time}&nbsp;</h2>
                                <p>(updated at {today.getHours()}.00)</p>
                            </div>
                        </div>
                        <table className="col-4">
                            <tbody>
                            <tr>
                                <td>Temperature:</td>
                                <td><b>{Math.round(input.history.location.state.result.main.temp)}°C</b></td>
                            </tr>
                            <tr>
                                <td>Wind:</td>
                                <td><b>{input.history.location.state.result.wind.speed} m/s, {getWindDirection(input.location.state.result.wind.gust)}</b></td>
                            </tr>
                            <tr>
                                <td>Feels like:</td>
                                <td><b>{Math.round(input.history.location.state.result.main.feels_like)}°C</b></td>
                            </tr>
                            <tr>
                                <td>Pressure:</td>
                                <td><b>{input.history.location.state.result.main.pressure } mmHg</b></td>
                            </tr>
                            <tr>
                                <td>Humidity:</td>
                                <td><b>{input.history.location.state.result.main.humidity}%</b></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : ("")}
    {/* seven day prognose */}
            <div className="col-lg-8 col-md-12 seven-day">
                {input.location.state.res.daily !== 0 && (
                    input.location.state.res.daily.slice(0,7).map((anObjectMapped) => {
                        return (
                            <div className="weather-card" key={anObjectMapped.sunrise}>
                                <h2>{days[i++]}</h2>
                                {weatherIcon(anObjectMapped.weather[0].main)}
                                <p>{anObjectMapped.temp.day}°</p>
                                <p>{anObjectMapped.wind_speed} m/s</p>
                            </div>
                        );
                    })
                )}
            </div>
            </div>
        </div>
    )
}
