import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const api_key = import.meta.env.VITE_SOME_KEY
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'

console.log(api_key);

const getCountries = () => {
    return axios.get(baseUrl+"all");
}

const getWeather = (city) => {
    return axios.get(weatherUrl+"q="+city+"&appid="+api_key)
}

export default { 
    getCountries,
    getWeather
}