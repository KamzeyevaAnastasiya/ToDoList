import { useAppDispatch } from '@/common/hooks'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { todolistsApi } from '@/features/todolists/api/todolistsApi'
import { selectTodolists } from '@/features/todolists/model/todolists-selectors.ts'
import { setTodolistsAC } from '@/features/todolists/model/todolists-slice'
import { Paper } from '@mui/material'
import Grid from '@mui/material/Grid'
import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import { useEffect } from 'react'

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      dispatch(setTodolistsAC({ todolists: res.data }))
    })
  }, [])

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
