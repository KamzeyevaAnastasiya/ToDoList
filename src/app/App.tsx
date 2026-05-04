import './App.css'
import { selectThemeMode } from '@/app/app-slice'
import { ErrorSnackbar, Header } from '@/common/components'
import type { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { getTheme } from '@/common/theme'
import { Main } from '@/app/Main.tsx'

export type FilterValues = 'All' | 'Active' | 'Completed'

export type TasksState = {
  [todolistId: string]: DomainTask[]
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
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
