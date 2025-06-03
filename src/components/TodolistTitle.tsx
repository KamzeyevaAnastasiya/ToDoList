type TodolistTitleProps = {
	title: string
}

export const TodolistTitle = (props: TodolistTitleProps) => {
	return (
        <h3>{props.title}</h3>
    )
}