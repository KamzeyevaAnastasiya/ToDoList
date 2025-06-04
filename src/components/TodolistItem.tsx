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
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter}: TodolistItemProps) => {
    return (
        <div>
            <TodolistTitle title={title}/>
            <AddTaskForm/>
            <TasksList tasks={tasks} deleteTask={deleteTask}/>
            <FilterButtons changeFilter={changeFilter}/>
        </div>
    )
}