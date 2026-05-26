import { selectThemeMode, setIsLoggedInAC } from '@/app/app-slice'
import { ErrorSnackbar, Header } from '@/common/components'
import { ResultCode } from '@/common/enums'
import { useAppDispatch } from '@/common/hooks'
import { Routing } from '@/common/routing'
import { useMeQuery } from '@/features/auth/api/authApi'
import { CircularProgress } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { getTheme } from '@/common/theme'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import styles from './App.module.css'

export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  const { data, isLoading } = useMeQuery()

  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoading) return
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    }
    setIsInitialized(true)
  }, [isLoading])

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
        <ToastContainer />
      </div>
    </ThemeProvider>
  )
}
