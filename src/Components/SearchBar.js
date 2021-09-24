/*import React, {useState} from 'react';
import {Icon} from "@iconify/react";
import { useHistory } from 'react-router-dom';

export default function SearchBar({placeholder, data}) *//*{
    /*const [filteredData, setFilteredData] = useState([]);
    const [inputVal, setInputVal] = useState("");
    const [weather, setWeather] = useState({});
    let i = 0;

    const handleFilter = (e) => {
        //Input field handler
        const searchedCity = e.target.value
        setInputVal(searchedCity);
        const filter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchedCity.toLowerCase());
        });
        //check if searched city is an empty string or not
        if (searchedCity === '') {
            setFilteredData([])
        } else {
            setFilteredData(filter)
        }
    }

    const addToHistory = function() {
        history.unshift(filteredData[0].name);
        localStorage["cache"] = (JSON.stringify(history.slice(0, 5)))
    }

    const browserHistory = useHistory();

    const search = e => {
        if (e.key === "Enter") {
            fetch(`${api.base}weather?q=${filteredData[0].name}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    addToHistory()
                    setWeather(result);
                    browserHistory.push("/weather");
                })

        }
    }

    //Clear user input
    const clearInput = () => {
        setFilteredData([]);
        setInputVal("");
    }

    return (
        <div>
            <div className='input-container'>
                <Icon icon="ion:location-outline" />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={inputVal}
                    onChange={handleFilter}
                    onKeyPress={search}
                />
                {inputVal.length !== 0 && (
                    <h6 onClick={clearInput}>Clear</h6>
                )}
            </div>

            {/*Map through data*//*}
            {filteredData.length !== 0 && (
                <div className='dataResult col-12'>
                    {filteredData.slice(0, 5).map((value, key) => {
                        return <p className="data" key={i++}> {value.name} </p>
                    })}
                    {inputVal[0] && (
                        <p className='enter'>Press Enter to select</p>
                    )}
                </div>
            )}
        </div>
    )
}*/