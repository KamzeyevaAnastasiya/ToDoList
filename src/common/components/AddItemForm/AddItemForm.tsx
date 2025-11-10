import {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'


type Props = {
    createItem: (taskTitle: string) => void
}


export const AddItemForm = ({createItem}: Props) => {
    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        setItemTitle(event.currentTarget.value)
    }
    const onButtonClickHandler = () => {
        if (itemTitle.trim()) {
            createItem(itemTitle.trim())
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

            <TextField
                label="Enter a title"
                helperText={error}
                variant="outlined"
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                value={itemTitle}
                size={'small'}
            />

            <IconButton onClick={onButtonClickHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>

        </div>
    )
}