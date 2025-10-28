import {TodolistTitle} from './TodolistTitle'
import {AddItemForm} from './AddItemForm.tsx'
import {TasksList} from './TasksList.tsx'
import {FilterButtons} from './FilterButtons.tsx'
import {FilterValues, TaskType} from '../app/App.tsx'
import {useCallback, useMemo} from "react";
import * as React from "react";

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


export const TodolistItem = React.memo(({
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

    const onCreateItemHandler = useCallback((taskTitle: string) => {
        createTask(todolistId, taskTitle)
    }, [createTask, todolistId])

    const filteredTasks = useMemo(() => {
        let tasksForTodolist = tasks

        if (filter === 'Active') {
            tasksForTodolist = tasks.filter(t => !t.isDone)
        }
        if (filter === 'Completed') {
            tasksForTodolist = tasks.filter(t => t.isDone)
        }

        return tasksForTodolist
    }, [tasks, filter])

    return (
        <div>
            <TodolistTitle todolistId={todolistId}
                           title={title}
                           deleteTodolist={deleteTodolist}
                           changeTodolistTitle={changeTodolistTitle}/>
            <AddItemForm createItem={onCreateItemHandler}/>
            <TasksList todolistId={todolistId}
                       tasks={filteredTasks}
                       deleteTask={deleteTask}
                       changeStatusTask={changeStatusTask}
                       changeTaskTitle={changeTaskTitle}/>
            <FilterButtons todolistId={todolistId}
                           filter={filter}
                           changeTodolistFilter={changeTodolistFilter}/>
        </div>
    )
})