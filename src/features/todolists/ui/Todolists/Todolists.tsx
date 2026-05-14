import { containerSx } from '@/common/styles'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi'
import { TodolistSkeleton } from '@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton'
import { Paper } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: '32px' }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <>
      {todolists &&
        todolists.map((todolist) => {
          return (
            <Grid key={todolist.id}>
              <Paper sx={{ p: '0 20px 20px 20px' }}>
                <TodolistItem todolist={todolist} />
              </Paper>
            </Grid>
          )
        })}
    </>
  )
}
