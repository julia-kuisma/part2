import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css';

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
				<li key={person.id}>{person.name} {person.number} <button id={person.id} onClick={() => props.deleteOnClick(person.id, person.name)}>Delete</button></li>
			))}
		</ul>
	)
}

const Notification = (props) => {
	const status = "status status-"+props.message.status;
	return(
		<div className={status}>{props.message.text}</div>
	);
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
	const [errorMessage, setErrorMessage] = useState([])

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
			const existingPerson = persons.find(p => p.name === newName);
			const changedPerson = { ...existingPerson, number: newNumber }
			if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
				personService
				.update(existingPerson.id, changedPerson)
				.then(returnedPerson => {
					setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
					setErrorMessage({status: 'success', text: `Modified ${nameObject.name}`})
				})
				.catch(() => {
					setErrorMessage({status: 'failed', text: `Information of ${nameObject.name} has already been removed from server`})
				})
			}
		} else {
			personService
			.create(nameObject)
			.then(response => {
				setPersons(persons.concat(nameObject))
				setNewName('')
				setNewNumber('')
				setErrorMessage({status: 'success', text: `Added ${nameObject.name}`})
			})
		}
	}

	const handleFilter = (event) => {
		setFilter(event.target.value);
	}

	const handleDeletePerson = (id, name) => {
		if (window.confirm(`Remove '${name}' from the server?`)) {
			personService
			.deletePerson(id)
			.then(response => {
				setPersons(persons.filter(p => p.id !== id))
				setErrorMessage({status: 'success', text: `Removed ${name}`})
			})
			.catch(() => {
				setErrorMessage({status: 'failed', text: `Information of ${name} has already been removed from server`})
			})
		}
	}

	useEffect(() => {
		personService
		.getAll()
		.then(response => {
			setPersons(response.data)
		})
	}, [])

	return (
		<>
			<h1>Phonebook</h1>
			<Notification message={errorMessage} />
			<Filter onChange={handleFilter}/>
			<h2>Add a new</h2>
			<Form nameValue={newName} nameChange={handleNameChange} numberValue={newNumber} numberChange={handleNumberChange} addPerson={addName} />
			<h2>Numbers</h2>
			<PersonList persons={filteredPersons} deleteOnClick={handleDeletePerson} />
		</>
	)
}

export default App