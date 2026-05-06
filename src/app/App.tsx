import './App.css'
import { selectThemeMode } from '@/app/app-slice'
import { ErrorSnackbar, Header } from '@/common/components'
import { Routing } from '@/common/routing'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { getTheme } from '@/common/theme'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
