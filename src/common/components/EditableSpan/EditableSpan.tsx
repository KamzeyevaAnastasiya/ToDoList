import { ChangeEvent, useState } from 'react'
import TextField from '@mui/material/TextField'

export type Props = {
  value: string
  onChange: (title: string) => void
  disabled?: boolean
}

export const EditableSpan = ({ value, onChange, disabled }: Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState(value)

  const onEditMode = () => {
    if (disabled) return
    setIsEditMode(true)
  }

  const offEditMode = () => {
    setIsEditMode(false)
    onChange(title)
  }

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  return (
    <>
      {isEditMode ? (
        <TextField
          variant={'outlined'}
          value={title}
          size={'small'}
          onChange={changeTitle}
          onBlur={offEditMode}
          autoFocus
        />
      ) : (
        <span onDoubleClick={onEditMode}>{value}</span>
      )}
    </>
  )
}
