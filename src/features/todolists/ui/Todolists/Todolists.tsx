import { useGetTodolistsQuery, useReorderTodolistMutation } from '@/features/todolists/api/todolistsApi'
import type { DomainTodolist } from '@/features/todolists/lib/types'
import { TodolistSkeleton } from '@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { useSortable, isSortable } from '@dnd-kit/react/sortable'
import { Paper } from '@mui/material'
import Box from '@mui/material/Box'
import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'

const SortableTodolist = ({ todolist, index }: { todolist: DomainTodolist; index: number }) => {
  const { ref, isDragging } = useSortable({
    id: todolist.id,
    index,
  })

  return (
    <Box
      ref={ref}
      style={{
        width: '100%',
        height: '440px',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
      }}
    >
      <Paper
        sx={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          p: '10px 20px 20px',
        }}
      >
        <TodolistItem todolist={todolist} />
      </Paper>
    </Box>
  )
}

export const Todolists = () => {
  const { data: items = [], isLoading } = useGetTodolistsQuery()
  const [reorderTodolists] = useReorderTodolistMutation()

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return

    const { source } = event.operation

    if (!isSortable(source)) return
    const { initialIndex, index } = source.sortable

    if (initialIndex === index) return

    let putAfterItemId: string | null

    if (index > initialIndex) {
      putAfterItemId = items[index].id
    } else {
      putAfterItemId = index > 0 ? items[index - 1].id : null
    }

    reorderTodolists({
      id: source.id as string,
      putAfterItemId,
    })
  }

  if (isLoading) {
    return (
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 305px)',
          justifyContent: 'center',
          gap: '32px',
          alignItems: 'stretch',
          width: '100%',
        }}
      >
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 305px)',
          justifyContent: 'center',
          gap: '32px',
          alignItems: 'stretch',
          width: '100%',
        }}
      >
        {items.map((todolist, index) => {
          return <SortableTodolist key={todolist.id} todolist={todolist} index={index} />
        })}
      </Box>
    </DragDropProvider>
  )
}
