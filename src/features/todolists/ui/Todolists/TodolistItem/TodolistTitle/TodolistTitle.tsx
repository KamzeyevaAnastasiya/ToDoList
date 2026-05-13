import { EditableSpan } from '@/common/components'
import { useDeleteTodolistMutation, useUpdateTodolistTitleMutation } from '@/features/todolists/api/todolistsApi'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { type DomainTodolist } from '@/features/todolists/model/todolists-slice.ts'
import styles from './TodolistTitle.module.css'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const [deleteTodolist] = useDeleteTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === 'loading'} />
      </h3>
      <IconButton onClick={deleteTodolistHandler} disabled={entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
