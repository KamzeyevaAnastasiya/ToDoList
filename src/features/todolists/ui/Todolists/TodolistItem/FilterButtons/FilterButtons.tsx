import { useAppDispatch } from '@/common/hooks'
import { containerSx } from '@/common/styles'
import { todolistsApi } from '@/features/todolists/api/todolistsApi'
import type { DomainTodolist, FilterValues } from '@/features/todolists/lib/types'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

type Props = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeTodolistFilter = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.filter = filter
        }
      }),
    )
  }

  return (
    <Box sx={containerSx}>
      <Button
        variant={filter === 'All' ? 'outlined' : 'text'}
        color={'inherit'}
        onClick={() => changeTodolistFilter('All')}
      >
        All
      </Button>
      <Button
        variant={filter === 'Active' ? 'outlined' : 'text'}
        color={'primary'}
        onClick={() => changeTodolistFilter('Active')}
      >
        Active
      </Button>
      <Button
        variant={filter === 'Completed' ? 'outlined' : 'text'}
        color={'secondary'}
        onClick={() => changeTodolistFilter('Completed')}
      >
        Completed
      </Button>
    </Box>
  )
}
