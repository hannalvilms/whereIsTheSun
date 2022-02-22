import React, {useState, useEffect} from 'react';
import './style.css';
import cities from 'cities.json';
import Cache from "./Components/Cache";
import {useHistory} from "react-router-dom";
import {api} from './secret';
import {useWindowSize, changeIcon, addToHistory} from './utils';

function App() {
    //define variables
    const [filteredData, setFilteredData] = useState([]);
    const [inputVal, setInputVal] = useState("");
    const [weather, setWeather] = useState({});
    const [val, setDaily] = useState([]);
    const [myGeo, setMyGeo] = useState ("");
    const inputRef = React.useRef();
    const searchRef = React.createRef();
    const browserHistory = useHistory();
    let data = {}
    let j = 0;
    let className = 'data';
    let searchDown;

    const handleFilter = (e) => {
        //Input field handler
        const searchedCity = e.target.value;
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

    useEffect(() => {
        inputRef.current.focus();
    }, []);    

    //clear user input
    const clearInput = () => {
        setFilteredData([]);
        setInputVal("");
    }
    
    const moveFocus = (e) => {
        const active = document.activeElement;
        const resultsItems = searchRef.current.children[1].children;
        const dataLenght = resultsItems.length;
        if(e.keyCode === 40 && active.nextSibling && j < dataLenght) {
            resultsItems[j].classList.add('selected');
            if (j >= 1 && j < dataLenght && resultsItems[j-1].classList.contains('selected')) {
                resultsItems[j-1].classList.remove('selected');
            }
            j++;
            searchDown = resultsItems[j-1].innerText;
        }
        if (e.keyCode === 38 && active.previousSibling && j>0) {
            if (resultsItems[dataLenght-1].classList.contains('selected')) {
                j=j-1;
                resultsItems[dataLenght-1].classList.remove('selected');
            }
            if (dataLenght !== 1) {
                resultsItems[j-1].classList.add('selected');
                j--;
                if (j >= 0 && j < dataLenght-1 && resultsItems[j].classList.contains('selected')) {
                    resultsItems[j+1].classList.remove('selected');
                }
            }
            searchDown = resultsItems[j].innerText;
        }
    };

    const resetFocus = () => {
        const resultsItems = searchRef.current.children[1].children;
        for (let i = 0; i < resultsItems.length; i++) {
            if (resultsItems[i].classList.contains('selected')) {
                resultsItems[i].classList.remove('selected');
            }
        }
    }
    //detect window resize
    useWindowSize();
    
    const locationSearch = (e, city, url) => {
        e.preventDefault();
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(result => {
                addToHistory(city);
                setWeather(result);
                fetch(`${api.base}onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&units=metric&exclude=hourly,minutely&APPID=${api.key}`)
                    .then(response => {
                        if (response.ok) {
                            console.log(response)
                            return response.json()
                        }
                    })
                    .then(res => {
                        setDaily(res)
                        data = {result, res}
                        browserHistory.push("/whereIsTheSun/weather", data);
                    })
            })
            .catch(error => {
                alert('Oops, something went wrong!')}
            );
    }
    //search by input
    const search = e => {
        if (e.key === 'Enter' || e.type === 'click') {
            locationSearch(e, searchDown, `${api.base}weather?q=${searchDown}&units=metric&APPID=${api.key}`);
        }
    }
    // search by location
    const geo = (e) => {
        e.preventDefault();
        fetch('http://ip-api.com/json/')
            .then(response => {
                if (response.ok) {
                    return response.json()
                } 
            })
            .then(response => {
                setMyGeo(response)
                let cityName = response.city
                locationSearch(e, cityName, `${api.base}weather?q=${cityName}&units=metric&APPID=${api.key}`, 'Turn off adblocker!')
            })
            .catch(error => {
                alert('Turn off your adblocker!')
            })
    }

    return (
      <div className='container-fluid'>
          <div className='row'>
            <div className='header col-lg-4 col-md-4 col-sm-12 col-12'>
                <div className='logo'>
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
                {/*Show cache*/}
                {(window.innerWidth > 767) ? (<Cache/>) : ('')}
            </div>
            <form  
                className='search-bar col-8 col-md-8 col-sm-12 col-12' 
                ref={searchRef}>
                {/*Search input*/}
                    <div className='input-container col-12'>
                        {changeIcon(inputVal)}
                        <input
                            type="text"
                            placeholder="Enter location"
                            value={inputVal}
                            ref={inputRef}
                            onChange={(e) => {handleFilter(e); resetFocus()}}
                            onKeyDown={(e) => {moveFocus(e); }}
                            onKeyPress={search}
                        />
                        {inputVal.length !== 0 && (
                            <h6 onClick={clearInput}>Clear</h6>
                        )}
                    </div>
                {/*give search options*/}
                {filteredData.length !== 0 && (
                    <div className='search-results'>
                        {filteredData.slice(0, 6).map((value, j) => {
                            return <p
                            className={className}
                            key={j++}
                            onClick={(e) => {
                                searchDown=value.name;
                                search(e);
                                }
                            }
                            > {value.name} </p>
                        })}
                    </div>
                )}
                <div className="col-12 geo">
                    <button onClick={(e) => geo(e)}>Select my current location</button>
                </div>
            </form>
          </div>
      </div>
  );
}

export default App;
