import { TodolistTitle } from "./TodolistTitle"
import { AddTaskForm } from "../components/AddTaskForm"
import { TasksList } from "../components/TasksList"
import { FilterButtons } from "../components/FilterButtons"
import { TaskType } from "../App"

type TodolistItemProps = {
	title: string
	tasks: TaskType[]
}

export const TodolistItem = ({title, tasks}: TodolistItemProps) => {
	return (
		<div>
			<TodolistTitle title={title}/>
			<AddTaskForm/>
			<TasksList tasks={tasks}/>
			<FilterButtons/>
		</div>
	)
}