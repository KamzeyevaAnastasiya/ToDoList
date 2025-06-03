import { TaskType } from "../App"

type TasksListProps = {
    tasks: TaskType[]
}

export const TasksList = ({tasks}: TasksListProps) => {

const tasksList = tasks.length === 0
    ? <span>Ваш список пуст</span>
    : <ul>
        {tasks.map(tasks => {
            return (
                <li key={tasks.id}>
                    <input type="checkbox" checked={tasks.isDone}/> <span>{tasks.title}</span>
            </li>
            )
        })}
    </ul>

	return (
        <>
            {tasksList}
        </>
    )
}