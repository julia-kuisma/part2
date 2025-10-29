import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	]) 
	const [newName, setNewName] = useState('a new note...')

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	}

	const addName = (event) => {
		event.preventDefault()
		const nameObject = {
			name: newName
		}
		const exists = persons.some(person => person.name === newName);

		if (exists) {
			alert(`${newName} is already added to phonebook`);
		} else {
			setPersons(persons.concat(nameObject))
			setNewName('')
		}
	}

	return (
		<>
			<h1>Phonebook</h1>
			<form>
				<label htmlFor="name_input">name:</label>
				<input id="name_input" onChange={handleNameChange} value={newName} />
				<div>
					<button type="submit" onClick={addName}>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map(person => (
					<li key={person.name}>{person.name}</li>
				))}
			</ul>
		</>
	)
}

export default App