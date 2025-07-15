import {TodolistTitle} from './TodolistTitle'
import {AddTaskForm} from '../components/AddTaskForm'
import {TasksList} from '../components/TasksList'
import {FilterButtons} from '../components/FilterButtons'
import {FilterValues, TaskType} from '../App'

type TodolistItemProps = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType['id']) => void
    changeFilter: (nextFilter: FilterValues) => void
    createTask: (title: string) => void
    changeStatusTask: (taskId: string, isDone: boolean) => void
    filter: FilterValues
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask, changeStatusTask, filter}: TodolistItemProps) => {
    return (
        <div>
            <TodolistTitle title={title}/>
            <AddTaskForm createTask={createTask}/>
            <TasksList tasks={tasks} deleteTask={deleteTask} changeStatusTask={changeStatusTask}/>
            <FilterButtons changeFilter={changeFilter} filter={filter}/>
        </div>
    )
}