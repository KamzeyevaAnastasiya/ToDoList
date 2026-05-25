import { PAGE_SIZE } from '@/common/constants'
import { TaskStatus } from '@/common/enums'
import { useGetTasksQuery, useReorderTaskMutation } from '@/features/todolists/api/tasksApi'
import type { DomainTask } from '@/features/todolists/api/tasksApi.types'
import type { DomainTodolist } from '@/features/todolists/lib/types'
import { TasksPagination } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination'
import { TasksSkeleton } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { isSortable, useSortable } from '@dnd-kit/react/sortable'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Task/TaskItem.tsx'
import { useState } from 'react'
import styles from './Tasks.module.css'

type Props = {
  todolist: DomainTodolist
}

const SortableTasks = ({ todolist, task, index }: { todolist: DomainTodolist; task: DomainTask; index: number }) => {
  const { ref, isDragging } = useSortable({
    id: task.id,
    index,
  })

  return (
    <Box ref={ref} sx={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}>
      <TaskItem task={task} todolist={todolist} />
    </Box>
  )
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetTasksQuery({ todolistId: id, params: { page } })
  const [reorderTasks] = useReorderTaskMutation()

  let filteredTasks = data?.items
  if (filter === 'Active') {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === 'Completed') {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return

    const { source } = event.operation

    if (!isSortable(source)) return
    const { initialIndex, index } = source.sortable

    if (initialIndex === index) return

    const activeId = source.id as string

    if (!filteredTasks) return

    const newItems = [...filteredTasks]
    const [movedItem] = newItems.splice(initialIndex, 1)
    newItems.splice(index, 0, movedItem)

    const putAfterItemId = index > 0 ? newItems[index - 1].id : null

    reorderTasks({
      todolistId: id,
      taskId: activeId,
      putAfterItemId,
    })
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      {filteredTasks && filteredTasks.length === 0 ? (
        <span className={styles.span}>Ваш список пуст</span>
      ) : (
        <>
          <List>
            {filteredTasks &&
              filteredTasks.map((task, index) => (
                <SortableTasks key={task.id} task={task} todolist={todolist} index={index} />
              ))}
          </List>
          {data && data.totalCount > PAGE_SIZE && (
            <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
          )}
        </>
      )}
    </DragDropProvider>
  )
}
