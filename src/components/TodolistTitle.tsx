import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from './EditableSpan.tsx';
import {useCallback} from "react";
import * as React from "react";

type TodolistTitleProps = {
    todolistId: string
    title: string
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}


export const TodolistTitle = React.memo(({todolistId, title, deleteTodolist, changeTodolistTitle}: TodolistTitleProps) => {
    const deleteTodolistHandler = useCallback(() => {
        deleteTodolist(todolistId)
    }, [todolistId])

    const onChangeTodolistTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitle(todolistId, newTitle)
    }, [todolistId])


    return (
        <div className={'container'}>
            <h3>
                <EditableSpan value={title} onChange={onChangeTodolistTitleHandler}/>
            </h3>
            <IconButton onClick={deleteTodolistHandler}>
                <DeleteIcon />
            </IconButton>
        </div>

    )
})