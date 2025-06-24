import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button.tsx';

type AddTaskFormType = {
    createTask: (title: string) => void
}


export const AddTaskForm = ({createTask}: AddTaskFormType) => {
    const [taskTitle, setTaskTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const onButtonClickHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
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
                   onKeyDown={onKeyDownHandler}/>
            <Button title={'+'} onClickHandler={onButtonClickHandler}/>
        </div>
    )
}