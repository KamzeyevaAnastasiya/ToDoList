import {TodolistTitle} from './TodolistTitle'
import {AddTaskForm} from '../components/AddTaskForm'
import {TasksList} from '../components/TasksList'
import {FilterButtons} from '../components/FilterButtons'
import {FilterValues, TaskType} from '../App'

type TodolistItemProps = {
    todolistId: string
    title: string
    filter: FilterValues
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: TaskType['id']) => void
    changeTodolistFilter: (todolistId: string, nextFilter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeStatusTask: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void

}

export const TodolistItem = ({
                                 todolistId,
                                 title,
                                 filter,
                                 tasks,
                                 deleteTask,
                                 changeTodolistFilter,
                                 createTask,
                                 changeStatusTask,
                                 deleteTodolist
                             }: TodolistItemProps) => {
    return (
        <div>
            <TodolistTitle todolistId={todolistId} title={title} deleteTodolist={deleteTodolist}/>
            <AddTaskForm todolistId={todolistId} createTask={createTask}/>
            <TasksList todolistId={todolistId} tasks={tasks} deleteTask={deleteTask} changeStatusTask={changeStatusTask}/>
            <FilterButtons todolistId={todolistId} filter={filter} changeTodolistFilter={changeTodolistFilter}/>
        </div>
    )
}