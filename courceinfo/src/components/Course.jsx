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

export default Course