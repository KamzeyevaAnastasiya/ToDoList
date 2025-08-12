import {TaskType} from '../App'
import {Button} from './Button.tsx';
import {ChangeEvent} from 'react';

type TasksListProps = {
    todolistId: string
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: TaskType['id']) => void
    changeStatusTask: (todolistId: string, taskId: string, isDone: boolean) => void
}

export const TasksList = ({todolistId, tasks, deleteTask, changeStatusTask}: TasksListProps) => {

    const tasksList = tasks.length === 0
        ? <span>Ваш список пуст</span>
        : <ul>
            {tasks.map(tasks => {
                const onClickButtonHandler = () => {
                    deleteTask(todolistId, tasks.id)
                }

                const onChangeStatusTask = (event: ChangeEvent<HTMLInputElement>) => {
                    changeStatusTask(todolistId, tasks.id, event.currentTarget.checked)
                }

                return (
                    <li key={tasks.id} className={tasks.isDone ? 'is-done' : ''}>
                        <input onChange={onChangeStatusTask} type="checkbox" checked={tasks.isDone}/>
                        <span>{tasks.title}</span>
                        <Button title={'x'} onClickHandler={onClickButtonHandler}/>
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