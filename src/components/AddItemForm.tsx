import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button.tsx';


type AddItemFormType = {
    onCreateItem: (taskTitle: string) => void
}


export const AddItemForm = ({onCreateItem}: AddItemFormType) => {
    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setItemTitle(event.currentTarget.value)
    }
    const onButtonClickHandler = () => {
        if (itemTitle.trim()) {
            onCreateItem(itemTitle.trim())
            setItemTitle('')
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
            <input value={itemTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? 'error' : ''}/>
            <Button title={'+'} onClickHandler={onButtonClickHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}