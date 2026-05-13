import { TaskStatus } from '@/common/enums'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi'
import type { DomainTodolist } from '@/features/todolists/model/todolists-slice'
import List from '@mui/material/List'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Task/TaskItem.tsx'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter, entityStatus } = todolist

  const { data } = useGetTasksQuery(id)

  let filteredTasks = data?.items
  if (filter === 'Active') {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === 'Completed') {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {filteredTasks && filteredTasks.length === 0 ? (
        <span>Ваш список пуст</span>
      ) : (
        <List>
          {filteredTasks &&
            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} todolistId={id} disabled={entityStatus === 'loading'} />
            ))}
        </List>
      )}
    </>
  )
}
