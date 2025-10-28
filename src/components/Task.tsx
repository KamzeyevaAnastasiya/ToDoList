import {ChangeEvent, useCallback} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from './EditableSpan.tsx';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem'
import {listItemSx} from './TasksList.styles.ts';
import {TaskType} from "../app/App.tsx";
import * as React from "react";


type TaskListProps = {
    todolistId: string
    task: TaskType
    deleteTask: (todolistId: string, taskId: TaskType['id']) => void
    changeStatusTask: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, title: string, taskId: TaskType['id']) => void
}

export const Task = React.memo(({todolistId, task, deleteTask, changeStatusTask, changeTaskTitle}: TaskListProps) => {
    const onClickButtonHandler = () => {
        deleteTask(todolistId, task.id)
    }

    const onChangeStatusTask = (event: ChangeEvent<HTMLInputElement>) => {
        changeStatusTask(todolistId, task.id, event.currentTarget.checked)
    }

    const onChangeTaskTitle = useCallback((newTitle: string) => {
        changeTaskTitle(todolistId, newTitle, task.id)
    }, [changeTaskTitle, todolistId, task.id])

    return (
        <ListItem key={task.id}
                  sx={listItemSx(task.isDone)}>
            <div>
                <Checkbox
                    checked={task.isDone}
                    onChange={onChangeStatusTask}
                />
                <EditableSpan value={task.title} onChange={onChangeTaskTitle}/>
            </div>
            <IconButton onClick={onClickButtonHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
})