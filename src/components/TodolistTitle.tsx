import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from './EditableSpan.tsx';

type TodolistTitleProps = {
    todolistId: string
    title: string
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}


export const TodolistTitle = ({todolistId, title, deleteTodolist, changeTodolistTitle}: TodolistTitleProps) => {
    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }

    const onChangeTodolistTitleHandler = () => {
        changeTodolistTitle(todolistId, title)
    }


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
}