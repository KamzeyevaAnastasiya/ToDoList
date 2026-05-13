import { EditableSpan } from '@/common/components'
import { useAppDispatch } from '@/common/hooks'
import { useDeleteTodolistMutation } from '@/features/todolists/api/todolistsApi'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { changeTodolistTitleTC, type DomainTodolist } from '@/features/todolists/model/todolists-slice.ts'
import styles from './TodolistTitle.module.css'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const [deleteTodolist] = useDeleteTodolistMutation()

  const dispatch = useAppDispatch()

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} disabled={entityStatus === 'loading'} />
      </h3>
      <IconButton onClick={deleteTodolistHandler} disabled={entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
