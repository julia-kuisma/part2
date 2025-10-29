import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-1234567' }
	]) 
	const [newName, setNewName] = useState('Firstname Lastname')
	const [newNumber, setNewNumber] = useState('+3581234567')

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

	return (
		<>
			<h1>Phonebook</h1>
			<form>
				<label htmlFor="name_input">name:</label>
				<input id="name_input" onChange={handleNameChange} value={newName} /><br />
				<label htmlFor="number_input">number:</label>
				<input id="number_input" onChange={handleNumberChange} value={newNumber} />
				<div>
					<button type="submit" onClick={addName}>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map(person => (
					<li key={person.name}>{person.name} {person.number}</li>
				))}
			</ul>
		</>
	)
}

export default App