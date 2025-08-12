import {Button} from './Button.tsx';

type TodolistTitleProps = {
    todolistId: string
    title: string
    deleteTodolist: (todolistId: string) => void
}

export const TodolistTitle = ({todolistId, title, deleteTodolist}: TodolistTitleProps) => {
    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }

    return (
        <div className={'container'}>
            <h3>{title}</h3>
            <Button title={'x'} onClickHandler={deleteTodolistHandler}/>
        </div>

    )
}