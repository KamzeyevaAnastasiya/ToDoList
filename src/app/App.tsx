import { selectThemeMode } from '@/app/app-slice'
import { ErrorSnackbar, Header } from '@/common/components'
import { useAppDispatch } from '@/common/hooks'
import { Routing } from '@/common/routing'
import { initializeAppTC } from '@/features/auth/model/auth-slice'
import { CircularProgress } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { getTheme } from '@/common/theme'
import { useEffect, useState } from 'react'
import styles from './App.module.css'

export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC()).finally(() => {
      setIsInitialized(true)
    })
  }, [])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
