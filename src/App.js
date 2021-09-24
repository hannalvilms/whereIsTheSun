import React, {useState} from 'react';
import './style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import cities from 'cities.json';
import Cache from "./Components/Cache";
import {useHistory} from "react-router-dom";
import {Icon} from "@iconify/react";
import {api} from './secret';

//get from cache
export let history = getHistory();
export function getHistory() {
    return JSON.parse(localStorage.getItem("cache")) || [];
}

function App() {
    //define constants
    const [filteredData, setFilteredData] = useState([]);
    const [inputVal, setInputVal] = useState("");
    const [weather, setWeather] = useState({});
    const [val, setDaily] = useState([]);
    const [myGeo, setMyGeo] = useState ("")
    let i = 0;


    const handleFilter = (e) => {
        //Input field handler
        const searchedCity = e.target.value
        setInputVal(searchedCity);
        const filter = cities.filter((value) => {
            return value.name.toLowerCase().includes(searchedCity.toLowerCase());
        });
        //check if searched city is an empty string or not
        if (searchedCity === '') {
            setFilteredData([])
        } else {
            setFilteredData(filter)
        }
    }

    //add to cache
    const addToHistory = function() {
        history.unshift(filteredData[0].name);
        localStorage["cache"] = (JSON.stringify(history.slice(0, 5)))
    }
    const browserHistory = useHistory();


    let data = {}
    //search by input
    const search = e => {
        if (e.key === "Enter") {
            fetch(`${api.base}weather?q=${filteredData[0].name}&units=metric&APPID=${api.key}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else if(response.status === 404) {
                        return Promise.reject('error 404')
                    } else {
                        return Promise.reject('some other error: ' + response.status)
                    }
                })
                .then(result => {
                    addToHistory()
                    setWeather(result)
                    fetch(`${api.base}onecall?lat=${filteredData[0].lat}&lon=${filteredData[0].lng}&units=metric&exclude=hourly,minutely&APPID=${api.key}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            } else if(response.status === 404) {
                                return Promise.reject('error 404')
                            } else {
                                return Promise.reject('some other error: ' + response.status)
                            }
                        })
                        .then(res => {
                            setDaily(res)
                            data = {result, res}
                            browserHistory.push("/weather", data);
                        })
                        .catch(error => console.log('error is', error));
                })
        }
    }

    // search by location
    const geo = () => {
        fetch('http://ip-api.com/json/')
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else if(response.status === 404) {
                    return Promise.reject('error 404')
                } else {
                    return Promise.reject('some other error: ' + response.status)
                }
            })
            .then(response => {
                setMyGeo(response)
                let cityName = response.city

                fetch(`${api.base}weather?q=${cityName}&units=metric&APPID=${api.key}`)
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        } else if(response.status === 404) {
                            return Promise.reject('error 404')
                        } else {
                            return Promise.reject('some other error: ' + response.status)
                        }
                    })
                    .then(result => {
                        setWeather(result);

                        fetch(`${api.base}onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&units=metric&exclude=hourly,minutely&APPID=${api.key}`)
                            .then(response => {
                                if (response.ok) {
                                    return response.json()
                                } else if(response.status === 404) {
                                    return Promise.reject('error 404')
                                } else {
                                    return Promise.reject('some other error: ' + response.status)
                                }
                            })
                            .then(res => {
                                setDaily(res)
                                data = {result, res}
                                browserHistory.push("/weather", data);
                            })
                    })
            .catch(error => {
                console.log(error)
                alert('Turn off adblocker!')
            })
            .catch(error => console.log('error is', error));
        }
    )}

    //change the location icon
    const changeIcon = () => {
        if(inputVal) {
            return <Icon icon="fluent:location-28-filled" />
        } else {
            return <Icon icon="fluent:location-28-regular" />
        }
    }

    //clear user input
    const clearInput = () => {
        setFilteredData([]);
        setInputVal("");
    }

    return (
      <div>
          <div className='header col-lg-12'>
              <div className='logo'>
                  <h1 className='waldo'>Where is Waldo</h1>
                  <h2 className='sun'>the sun</h2>
                  <hr/>
              </div>
          </div>
          <div  className='search-bar col-12'>
              {/*Search input*/}
              <div className='input-container col-12'>
                  {changeIcon()}
                  <input
                      className="col-9"
                      type="text"
                      placeholder={'Enter location'}
                      value={inputVal}
                      onChange={handleFilter}
                      onKeyPress={search}
                  />
                  {inputVal.length !== 0 && (
                      <h6 onClick={clearInput}>Clear</h6>
                  )}
              </div>

              {/*give search options*/}
              {filteredData.length !== 0 && (
                  <div className='dataResult col-12'>
                      {filteredData.slice(0, 4).map((value, key) => {
                          return <p className="data" key={i++}> {value.name} </p>
                      })}
                      {inputVal[0] && (
                          <p className='enter'>Press Enter to select</p>
                      )}
                  </div>
              )}
              <div className="col-12" onClick={geo}>
                  <h3>Select my current location</h3>
              </div>
              {/*Show cache*/}
              <Cache/>
          </div>
      </div>
  );
}

export default App;
