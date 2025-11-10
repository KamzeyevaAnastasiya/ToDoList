import {ChangeEvent} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan.tsx';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem'
import {TaskType} from "@/app/App.tsx";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {getListItemSx} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Task/TaskItem.styles.ts";


type Props = {
    task: TaskType
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC({todolistId, taskId: task.id}))
    }

    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: event.currentTarget.checked}))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, title, taskId: task.id}))
    }

    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}