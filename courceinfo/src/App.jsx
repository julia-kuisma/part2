const Course = (props) => {
	return(
		<>
			<Header name={props.course.name} />
			<Content parts={props.course.parts} />
			<Total parts={props.course.parts} />
		</>
	)
}

const Header = (props) => {
	return(
		<h1>{props.name}</h1>
	)
}

const Content = (props) => {
	return(
		<>
		{props.parts.map(part => (
			<Part key={part.id} name={part.name} exercises={part.exercises} />
		))}
		</>
	)
}

const Part = (props) => {
	return(
		<p>{props.name} {props.exercises}</p>
	)
}

const Total = (props) => {
	let total = 0;
	props.parts.forEach(part => {
		total += part.exercises;
	});
	return(
		<p><strong>Number of exercises: {total}</strong></p>
	)
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
	  {
		name: 'Redux',
		exercises: 11,
		id: 4
	  }
    ]
  }

  return <Course course={course} />
}

export default App