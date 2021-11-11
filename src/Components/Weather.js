import React from 'react';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from "react-router-dom";
import {Icon} from "@iconify/react";
import { 
    getDate, 
    getWindDirection, 
    weatherIcon, 
    changeBg, 
    backgroundImg 
} from '../utils';

export default function Weather(input) {
    let i = 1;
    const result = input.location.state.result;
    const res = input.location.state.res;
    //get time
    const today = new Date(),
    time = today.toTimeString().slice(0,8)
    //redirect to homepage
    const browserHistory = useHistory();
    const redirect = (e) => {
        e.stopPropagation()
        browserHistory.push("/whereIsTheSun");
    }
    changeBg(input.location.state.result.weather[0].main);

    return (
        <div className="container-fluid forecast-body" style={{
            backgroundImage:`
                linear-gradient(
                270deg,
                rgba(255,255,255,0) 5%, 
                rgba(217,	195,	185	, 1) 100%), 
                url('${backgroundImg}')
            `
          }}>
            <div className='row'>
                <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                    <div className='logo redirect' onClick={redirect}>
                        <svg viewBox="0 0 500 200">
                            <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
                            <text width="500">
                                <textPath startOffset="12%" xlinkHref="#curve">
                                Where is the
                                </textPath>
                            </text>
                        </svg>
                        <h2 className='sun'>sun</h2>
                    </div>
                </div>
                <div className="weather-content col-lg-10 col-md-10 col-sm-10 col-10">
                    <div className='weather-location col-lg-9 col-md-9 col-sm-11 col-11'>
                        <Icon icon="eva:arrow-back-fill" className="back-icon" onClick={redirect}/>
                        <h1 onClick={redirect}>{result.name}</h1>
                    </div>
                    {/* weather right now */}
                    <div className="col-lg-9 col-md-9 col-sm-11 col-11 row">
                        {(typeof result.main !== "undefined") ? (
                            <div className="today-box col-12 row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="today-icon col-12">
                                        <h1>Today</h1>
                                        {weatherIcon(result.weather[0].main, 'weather-icon')}
                                    </div>
                                    <div className="updated-time">
                                        <h2>{time}&nbsp;</h2>
                                        <p>(updated at {today.getHours()}.00)</p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>Temperature:</td>
                                            <td><b>{Math.round(result.main.temp)}°C</b></td>
                                        </tr>
                                        <tr>
                                            <td>Wind:</td>
                                            <td><b>{result.wind.speed} m/s, {getWindDirection(result.wind.gust)}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Feels like:</td>
                                            <td><b>{Math.round(result.main.feels_like)}°C</b></td>
                                        </tr>
                                        <tr>
                                            <td>Pressure:</td>
                                            <td><b>{result.main.pressure } mmHg</b></td>
                                        </tr>
                                        <tr>
                                            <td>Humidity:</td>
                                            <td><b>{result.main.humidity}%</b></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : ("")}
                    </div>
                    {/* seven day prognose */}
                    <div className="col-lg-12 col-md-9 col-sm-11 col-11 seven-day">
                        {res.daily !== 0 && (
                            res.daily.slice(0,7).map((day) => {
                                var dt = res.daily[i++].dt;
                                return (
                                    <div className="weather-card" key={day.sunrise}>
                                        {getDate(dt)}
                                        {weatherIcon(day.weather[0].main)}
                                        <p>{Math.round(day.temp.day)}°</p>
                                        <p>{Math.round(day.wind_speed)} m/s</p>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
