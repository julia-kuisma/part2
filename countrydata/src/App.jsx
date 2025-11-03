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
					<li key={country.name.common}>{country.name.common}</li>
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
				</>
			)
		}
	}
}

function App() {
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState("")

	const filteredCountries = countries.filter(country =>
    	country.name.common.toLowerCase().includes(search.toLowerCase())
  	);

	useEffect(() => {
		countryServise
		.getCountries()
		.then(response => {
			setCountries(response.data)
		})
	}, [])

	const handleSearchChange = (event) => {
		const newValue = event.target.value;
		setSearch(newValue);
	}

	return (
		<>
			<label htmlFor="countrySearch">Find countries</label>
			<input type="text" id="countrySearch" onChange={handleSearchChange} />
			<CountryList countries={filteredCountries} />
		</>
  	)
}

export default App
