import {Button} from './Button.tsx';
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
            <Button title={'x'} onClickHandler={deleteTodolistHandler}/>
        </div>

    )
}