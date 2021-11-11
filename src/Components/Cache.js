import React, {useState}  from 'react';
import {Icon} from "@iconify/react";
import {history} from '../utils';
import {api} from '../secret';
import {useHistory} from "react-router-dom";

export default function Cache() {
    const browserHistory = useHistory();
    let data = {}
    const [weather, setWeather] = useState({});
    const [val, setDaily] = useState([]);
    const search = (e, i) => {
        if (e.type === 'click') {
            e.preventDefault();
            fetch(`${api.base}weather?q=${history[i-1]}&units=metric&APPID=${api.key}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                })
                .then(result => {
                    setWeather(result);
                    fetch(`${api.base}onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&units=metric&exclude=hourly,minutely&APPID=${api.key}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                        })
                        .then(res => {
                            setDaily(res)
                            data = {result, res}
                            browserHistory.push("/whereIsTheSun/weather", data);
                        }
                    )
                })
                .catch(error => 
                    alert('Oops, something went wrong!')
                );
        }
    }

    return (
        <div className="container main-cache">
            {/*Map through cache*/}
            {history.length !== 0 && (
                <div className="row">
                    <p className="recently-viewed text-center">Recently viewed</p>
                    {history.slice(0, 5).map((history, i) => {
                        return <div  onClick={(e) => search(e, i)} key={i++} className="cache col-12">
                            <h5>{history}</h5>
                            <p>Check weather <Icon icon="akar-icons:arrow-right" /></p>
                        </div>
                    })}
                </div>
            )}
        </div>
    )
}