import {TodolistTitle} from './TodolistTitle'
import {AddItemForm} from './AddItemForm.tsx'
import {TasksList} from './TasksList.tsx'
import {FilterButtons} from './FilterButtons.tsx'
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
    changeTaskTitle: (todolistId: string, title: string, taskId: TaskType['id']) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
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
                                 deleteTodolist,
                                 changeTaskTitle,
                                 changeTodolistTitle,
                             }: TodolistItemProps) => {

    const onCreateItemHandler = (taskTitle: string) => {
        createTask(todolistId, taskTitle)
    }


    return (
        <div>
            <TodolistTitle todolistId={todolistId}
                           title={title}
                           deleteTodolist={deleteTodolist}
                           changeTodolistTitle={changeTodolistTitle}/>
            <AddItemForm createItem={onCreateItemHandler}/>
            <TasksList todolistId={todolistId}
                       tasks={tasks}
                       deleteTask={deleteTask}
                       changeStatusTask={changeStatusTask}
                       changeTaskTitle={changeTaskTitle}/>
            <FilterButtons todolistId={todolistId}
                           filter={filter}
                           changeTodolistFilter={changeTodolistFilter}/>
        </div>
    )
}