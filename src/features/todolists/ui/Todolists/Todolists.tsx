import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi'
import type { DomainTodolist } from '@/features/todolists/lib/types'
import { TodolistSkeleton } from '@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton'
import { DragDropProvider, useDraggable } from '@dnd-kit/react'
import { Paper } from '@mui/material'
import Box from '@mui/material/Box'
import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'

const DraggableTodolist = ({ todolist }: { todolist: DomainTodolist }) => {
  const { ref, isDragging } = useDraggable({
    id: todolist.id,
  })

  const style = {
    opacity: isDragging ? 0.3 : 1,
    cursor: 'grab',
  }

  return (
    <Box ref={ref} style={style}>
      <Paper sx={{ p: '0 20px 20px 20px' }}>
        <TodolistItem todolist={todolist} />
      </Paper>
    </Box>
  )
}

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()
  //const [reorderTodolist] = useReorderTodolistMutation()

  if (isLoading) {
    return (
      <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <DragDropProvider>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
        {todolists?.map((todolist) => {
          return <DraggableTodolist key={todolist.id} todolist={todolist} />
        })}
      </Box>
    </DragDropProvider>
  )
}
