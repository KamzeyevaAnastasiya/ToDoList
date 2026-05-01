import { TaskStatus } from '@/common/enums'
import { useAppDispatch } from '@/common/hooks'
import { fetchTasksTC, selectTasks } from '@/features/todolists/model/tasks-slice'
import type { DomainTodolist } from '@/features/todolists/model/todolists-slice'
import List from '@mui/material/List'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Task/TaskItem.tsx'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { useEffect } from 'react'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === 'Active') {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === 'Completed') {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed)
  }

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  return (
    <>
      {filteredTasks && filteredTasks.length === 0 ? (
        <span>Ваш список пуст</span>
      ) : (
        <List>
          {filteredTasks && filteredTasks.map((task) => <TaskItem key={task.id} task={task} todolistId={id} />)}
        </List>
      )}
    </>
  )
}
