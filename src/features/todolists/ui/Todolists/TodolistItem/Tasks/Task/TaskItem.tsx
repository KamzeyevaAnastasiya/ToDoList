import { EditableSpan } from '@/common/components'
import { TaskStatus } from '@/common/enums'
import { useAppDispatch } from '@/common/hooks'
import type { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { ChangeEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import { deleteTaskTC, updateTaskTC } from '@/features/todolists/model/tasks-slice.ts'
import { getListItemSx } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Task/TaskItem.styles.ts'

type Props = {
  task: DomainTask
  todolistId: string
  disabled?: boolean
}

export const TaskItem = ({ task, todolistId, disabled }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }))
  }

  const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTaskTC({
        todolistId,
        taskId: task.id,
        domainModel: { status: event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New },
      }),
    )
  }

  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTC({ todolistId, domainModel: { title }, taskId: task.id }))
  }

  const isTaskCompleted = task.status === TaskStatus.Completed

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} disabled={disabled} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={disabled} />
      </div>
      <span>{new Date(task.addedDate).toLocaleDateString()}</span>
      <IconButton onClick={deleteTask} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
