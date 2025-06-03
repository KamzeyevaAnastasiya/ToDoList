import './App.css'
import { TodolistItem } from './components/TodolistItem'

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

export const App = () => {
	const TodolistTitle = "What to learn"

	const tasks: TaskType[] = [
		{ id: 1, title: "HTML&CSS", isDone: true },
		{ id: 2, title: "JS", isDone: true },
		{ id: 3, title: "React", isDone: false },
	]
		
		return (
		<div className="app">
			<TodolistItem title={TodolistTitle} tasks={tasks}/>
		</div>
	)
}

