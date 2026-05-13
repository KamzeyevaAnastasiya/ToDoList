import { clearDataAC } from '@/common/actions'
import { NavButton } from '@/common/components'
import { AUTH_TOKEN } from '@/common/constants'
import { ResultCode } from '@/common/enums'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { Path } from '@/common/routing'
import { containerSx } from '@/common/styles'
import { useLogoutMutation, useMeQuery } from '@/features/auth/api/authApi'
import { LinearProgress, Link } from '@mui/material'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Switch from '@mui/material/Switch'
import { changeThemeModeAC, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedInAC } from '@/app/app-slice.ts'

export const Header = () => {
  const [logout] = useLogoutMutation()
  const { data } = useMeQuery()

  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
  }

  const logoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: false }))
        localStorage.removeItem(AUTH_TOKEN)
        dispatch(clearDataAC())
      }
    })
  }

  return (
    <AppBar position="static" sx={{ mb: '30px' }} enableColorOnDark={false}>
      <Toolbar>
        <Container maxWidth={'lg'} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            {isLoggedIn && <span>{data?.data.login}</span>}
            {isLoggedIn && <NavButton onClick={logoutHandler}>Sign out</NavButton>}
            <NavButton component={Link} to={Path.Faq}>
              FAQ
            </NavButton>
            <Switch color={'default'} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}
