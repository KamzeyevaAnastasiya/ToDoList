import {ChangeEvent, useState} from 'react';


export type Props = {
    value: string
    onChange: (title: string) => void
}


export const EditableSpan = ({value, onChange}: Props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(value)

    const onEditMode = () => {
        setIsEditMode(!isEditMode)
    }

    const offEditMode = () => {
        setIsEditMode(!isEditMode)
        onChange(title)
    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }


    return (
        <>
            {isEditMode
                ? (<input value={title} onChange={changeTitle} onBlur={offEditMode} autoFocus/>)
                : (<span onDoubleClick={onEditMode}>{title}</span>)}
        </>

    );
};