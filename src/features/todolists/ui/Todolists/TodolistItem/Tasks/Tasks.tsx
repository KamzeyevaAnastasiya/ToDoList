import { PAGE_SIZE } from '@/common/constants'
import { TaskStatus } from '@/common/enums'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi'
import type { DomainTodolist } from '@/features/todolists/lib/types'
import { TasksPagination } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination'
import { TasksSkeleton } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton'
import List from '@mui/material/List'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Task/TaskItem.tsx'
import { useState } from 'react'
import styles from './Tasks.module.css'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetTasksQuery({ todolistId: id, params: { page } })

  let filteredTasks = data?.items
  if (filter === 'Active') {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === 'Completed') {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {filteredTasks && filteredTasks.length === 0 ? (
        <span className={styles.span}>Ваш список пуст</span>
      ) : (
        <>
          <List>
            {filteredTasks && filteredTasks.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)}
          </List>
          {data && data.totalCount > PAGE_SIZE && (
            <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
          )}
        </>
      )}
    </>
  )
}
