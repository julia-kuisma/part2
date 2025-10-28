const Course = (props) => {
	return(
		<>
			<Header name={props.course.name} type="h2" />
			<Content parts={props.course.parts} />
			<Total parts={props.course.parts} />
		</>
	)
}

const Header = (props) => {
	if (props.type == "h1") {
		return(
			<h1>{props.name}</h1>
		)
	}
	return(
		<h2>{props.name}</h2>
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
	const initialValue = 0;
	const total = props.parts.reduce(
		(sum, part) => sum + part.exercises,
		initialValue,
	);
	return(
		<p><strong>Number of exercises: {total}</strong></p>
	)
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <>
  	<Header name="Web Development Curriculum" type="h1" />
	{courses.map(course => (
		<Course key={course.id} course={course} />
	))}
  </>
}

export default App