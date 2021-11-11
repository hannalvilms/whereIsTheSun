import React, {useState, useLayoutEffect} from 'react';
import {Icon} from "@iconify/react";
import thunder from './img/thunder.jpg';
import rain from './img/rain.jpg';
import snow from './img/snow2.jpg';
import fog from './img/fog5.jpg';
import sand from './img/sand.jpg';
import clear from './img/leaves.jpg';
import clouds from './img/cloudy3.jpg';

//get from cache
export function getHistory() {
    return JSON.parse(localStorage.getItem("cache")) || [];
}
export let history = getHistory();
//add to cache
export function addToHistory(searchDown) {
    if (!localStorage["cache"].includes(searchDown) ) {
        history.unshift(searchDown);
    localStorage["cache"] = (JSON.stringify(history.slice(0, 5)))
    }
}

//change the location icon
export function changeIcon(inputVal) {
    if(inputVal) {
        return <Icon icon="fluent:location-28-filled" />
    } else {
        return <Icon icon="fluent:location-16-regular" />
    }
}

export function getDate(dt) {
    var date = new Date(dt * 1000);
    var stringify = String(date).slice(0,3);
    if (stringify === 'Mon') {
        return <h2>Monday</h2>
    } else if (stringify === 'Tue') {
        return <h2>Tuesday</h2>
    } else if (stringify === 'Wed') {
        return <h2>Wednesday</h2>
    } else if (stringify === 'Thu') {
        return <h2>Thursday</h2>
    } else if (stringify === 'Fri') {
        return <h2>Friday</h2>
    } else if (stringify === 'Sat') {
        return <h2>Saturday</h2>
    } else if (stringify === 'Sun') {
        return <h2>Sunday</h2>
    }
}

export let backgroundImg;
export function changeBg(description) {
    if (description === 'Thunderstorm') {
        backgroundImg = thunder
    } else if (description === 'Drizzle' || description === 'Rain') {
        backgroundImg = rain
    } else if (description === 'Snow') {
        backgroundImg = snow
    } else if (description === 'Haze') {
        backgroundImg = fog
    } else if (description === 'Dust') {
        backgroundImg = sand
    } else if (description === 'Clouds') {
        backgroundImg = clouds
    } else {
        backgroundImg = clear;
    }
}

export function getWindDirection(deg) {
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
export function weatherIcon(sky, className) {
    if (sky === 'Rain' || sky === 'Drizzle'){
        return <Icon className={className} icon="ph:cloud-rain-thin"/>
    } else if (sky === 'Clouds'){
        return <Icon className={className} icon="ph:cloud-thin"/>
    } else if (sky === 'Clear'){
        return <Icon className={className} icon="ph:sun-thin"/>
    } else if (sky === 'Thunderstorm'){
        return <Icon className={className} icon="ph:lightning-thin"/>
    } else if (sky === 'Snow'){
        return <Icon className={className} icon="ph:snowflake-thin"/>
    } else if (sky === 'Mist' || sky === 'Smoke' || sky === 'Dust' || sky === 'Haze' || sky === 'Fog'){
        return <Icon className={className} icon="ph:cloud-fog-thin"/>
    } else {
        return <Icon className={className} icon="ph:cloud-thin"/>
    }
}

export function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}
