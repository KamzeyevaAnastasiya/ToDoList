import { EditableSpan } from '@/common/components'
import { TaskStatus } from '@/common/enums'
import { useDeleteTaskMutation, useUpdateTaskMutation } from '@/features/todolists/api/tasksApi'
import type { DomainTask, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import type { DomainTodolist } from '@/features/todolists/lib/types'
import { ChangeEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import { getListItemSx } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Task/TaskItem.styles.ts'

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const deleteTaskHandler = () => {
    deleteTask({ todolistId: todolist.id, taskId: task.id })
  }
  const createTaskModel = (updates: Partial<UpdateTaskModel>): UpdateTaskModel => ({
    description: task.description,
    title: task.title,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    status: task.status,
    ...updates,
  })

  const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    updateTask({ todolistId: todolist.id, taskId: task.id, model: createTaskModel({ status: newStatusValue }) })
  }

  const changeTaskTitle = (title: string) => {
    updateTask({ todolistId: todolist.id, taskId: task.id, model: createTaskModel({ title: title }) })
  }

  const isTaskCompleted = task.status === TaskStatus.Completed
  const disabled = todolist.entityStatus === 'loading'

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} disabled={disabled} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={disabled} />
      </div>
      <span>{new Date(task.addedDate).toLocaleDateString()}</span>
      <IconButton onClick={deleteTaskHandler} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
