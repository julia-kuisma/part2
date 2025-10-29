import { useState } from 'react'

const Filter = (props) => {
	return(
		<>
			<label htmlFor="filter">Filter shown with</label>
			<input id="filter" onChange={props.onChange} />
		</>
	)
}

const Form = (props) => {
	return(
		<form>
			<label htmlFor="name_input">name:</label>
			<input id="name_input" onChange={props.nameChange} value={props.nameValue} /><br />
			<label htmlFor="number_input">number:</label>
			<input id="number_input" onChange={props.numberChange} value={props.numberValue} />
			<div>
				<button type="submit" onClick={props.addPerson}>add</button>
			</div>
		</form>
	)
}

const PersonList = (props) => {
	return(
		<ul>
			{props.persons.map(person => (
				<li key={person.name}>{person.name} {person.number}</li>
			))}
		</ul>
	)
}

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	]) 
	const [newName, setNewName] = useState('Firstname Lastname')
	const [newNumber, setNewNumber] = useState('+3581234567')
	const [filter, setFilter] = useState("");

	const filteredPersons = persons.filter(person =>
    	person.name.toLowerCase().includes(filter.toLowerCase())
  	);

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	}

	const addName = (event) => {
		event.preventDefault()
		const nameObject = {
			name: newName,
			number: newNumber
		}
		const exists = persons.some(person => person.name === newName);

		if (exists) {
			alert(`${newName} is already added to phonebook`);
		} else {
			setPersons(persons.concat(nameObject))
			setNewName('')
			setNewNumber('')
		}
	}

	const handleFilter = (event) => {
		setFilter(event.target.value);
	}

	return (
		<>
			<h1>Phonebook</h1>
			<Filter onChange={handleFilter}/>
			<h2>Add a new</h2>
			<Form nameValue={newName} nameChange={handleNameChange} numberValue={newNumber} numberChange={handleNumberChange} addPerson={addName} />
			<h2>Numbers</h2>
			<PersonList persons={filteredPersons} />
		</>
	)
}

export default App