import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button.tsx';

type AddTaskFormType = {
    todolistId: string
    createTask: (todolistId: string, title: string) => void
}

export const AddTaskForm = ({todolistId, createTask}: AddTaskFormType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(event.currentTarget.value)
    }
    const onButtonClickHandler = () => {
        if (taskTitle.trim()) {
            createTask(todolistId, taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onButtonClickHandler()
        }
    }

    return (
        <div>
            <input value={taskTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? 'error' : ''}/>
            <Button title={'+'} onClickHandler={onButtonClickHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}