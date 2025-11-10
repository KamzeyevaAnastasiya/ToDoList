import {ChangeEvent, useCallback, useState} from 'react';
import TextField from '@mui/material/TextField';
import * as React from "react";


export type Props = {
    value: string
    onChange: (title: string) => void
}


export const EditableSpan = React.memo(({value, onChange}: Props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(value)


    const onEditMode = () => {
        setIsEditMode(true)
    }

    const offEditMode = useCallback(() => {
        setIsEditMode(false)
        onChange(title)
    }, [value])

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }


    return (
        <>
            {isEditMode
                ? (<TextField variant={'outlined'}
                              value={title}
                              size={'small'}
                              onChange={changeTitle}
                              onBlur={offEditMode} autoFocus/>)
                : (<span onDoubleClick={onEditMode}>{value}</span>)}
        </>

    );
})