import { useState, useEffect } from 'react'
import countryServise from './services/countryService';

const CountryList = (props) => {
	if (props.countries.length > 10) {
		return(
			<p>Too many results</p>
		)
	} else if (props.countries.length > 1) {
		return(
			<ul>
				{props.countries.map(country => (
					<li key={country.name.common}>{country.name.common}<button id={country.name.common} onClick={props.onClick}>Show</button></li>
				))}
			</ul>
		)
	} else {
		const country = props.countries[0];
		if (country) {
			return(
				<>
					<h2>{country.name.common}</h2>
					<p>Capital: {country.capital}</p>
					<p>Area: {country.area}</p>
					<h3>Languages:</h3>
					<ul>
						{Object.entries(country.languages || {}).map(([code, name]) => (
							<li key={code}>
								{name} ({code})
							</li>
						))}
					</ul>
					<img src={country.flags.png} alt={country.flags.alt} />
					<h2>Weather in {country.capital}</h2>
					<p>Temperature: {(props.weather.main.temp - 273.15).toFixed(2)} Celsius</p>
					<img src={"https://openweathermap.org/img/wn/"+props.weather.weather[0].icon+"@2x.png"} alt={props.weather.weather[0].description} />
					<p>Wind: {props.weather.wind.speed} m/s</p>
				</>
			)
		}
	}
}

function App() {
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState("")
	const [weather, setWeather] = useState([])

	let filteredCountries = countries.filter(country =>
    	country.name.common.toLowerCase().includes(search.toLowerCase())
  	);

	useEffect(() => {
		countryServise
		.getCountries()
		.then(response => {
			setCountries(response.data)
		})
	}, [])

	useEffect(() => {
		if (filteredCountries.length == 1) {
			countryServise
			.getWeather(filteredCountries[0].capital)
			.then(response => {
				setWeather(response.data)
			})
		}
	}, [search])

	const handleSearchChange = (event) => {
		const newValue = event.target.value;
		setSearch(newValue);
	}

	const handleOnClick = (event) => {
		setSearch(event.target.id);
	}

	return (
		<>
			<label htmlFor="countrySearch">Find countries</label>
			<input type="text" id="countrySearch" onChange={handleSearchChange} />
			<CountryList countries={filteredCountries} weather={weather} onClick={handleOnClick} />
		</>
  	)
}

export default App
