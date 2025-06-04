import {TaskType} from '../App'
import {Button} from './Button.tsx';

type TasksListProps = {
    tasks: TaskType[]
    deleteTask: (taskId: TaskType['id']) => void
}

export const TasksList = ({tasks, deleteTask}: TasksListProps) => {

    const tasksList = tasks.length === 0
        ? <span>Ваш список пуст</span>
        : <ul>
            {tasks.map(tasks => {
                return (
                    <li key={tasks.id}>
                        <input type="checkbox" checked={tasks.isDone}/> <span>{tasks.title}</span>
                        <Button title={'x'} onClickHandler={() => {
                            deleteTask(tasks.id)
                        }}/>
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