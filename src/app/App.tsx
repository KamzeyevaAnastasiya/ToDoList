import './App.css'
import { Header } from '@/common/components'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectThemeMode } from './app-selectors.ts'
import { getTheme } from '@/common/theme'
import { Main } from '@/app/Main.tsx'

export type FilterValues = 'All' | 'Active' | 'Completed'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type TasksState = {
  [todolistId: string]: TaskType[]
}

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
