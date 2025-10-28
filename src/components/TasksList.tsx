import {TaskType} from '../app/App.tsx'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import {containerSx} from './TasksList.styles.ts';
import {Task} from "./Task.tsx";
import * as React from "react";


type TasksListProps = {
    todolistId: string
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: TaskType['id']) => void
    changeStatusTask: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, title: string, taskId: TaskType['id']) => void
}


export const TasksList = React.memo(({todolistId, tasks, deleteTask, changeStatusTask, changeTaskTitle}: TasksListProps) => {

    const tasksList = tasks.length === 0
        ? <span>Ваш список пуст</span>
        : <List>
            {tasks.map(t =>
                <Task todolistId={todolistId} task={t} deleteTask={deleteTask} changeStatusTask={changeStatusTask}
                      changeTaskTitle={changeTaskTitle} key={t.id}/>
            )}
        </List>


    return (
        <Box sx={containerSx}>{tasksList}</Box>
    )
})