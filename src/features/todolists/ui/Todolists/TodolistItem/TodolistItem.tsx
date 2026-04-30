import { CreateItemForm } from '@/common/components'
import { useAppDispatch } from '@/common/hooks'
import { TodolistTitle } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx'
import { Tasks } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx'
import { FilterButtons } from '@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx'
import { Todolist } from '@/app/App.tsx'
import { createTaskAC } from '@/features/todolists/model/tasks-slice.ts'

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskAC({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
