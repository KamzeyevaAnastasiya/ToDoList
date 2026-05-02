import { EditableSpan } from '@/common/components'
import { TaskStatus } from '@/common/enums'
import { useAppDispatch } from '@/common/hooks'
import type { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { ChangeEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskTC } from '@/features/todolists/model/tasks-slice.ts'
import { getListItemSx } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Task/TaskItem.styles.ts'

type Props = {
  task: DomainTask
  todolistId: string
}

export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }))
  }

  const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId: task.id, isDone: event.currentTarget.checked }))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, title, taskId: task.id }))
  }

  const isTaskCompleted = task.status === TaskStatus.Completed

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
