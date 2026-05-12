import { NavButton } from '@/common/components'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { Path } from '@/common/routing'
import { containerSx } from '@/common/styles'
import { logoutTC, selectIsLoggedIn, selectUserData } from '@/features/auth/model/auth-slice'
import { LinearProgress, Link } from '@mui/material'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Switch from '@mui/material/Switch'
import { changeThemeModeAC, selectStatus, selectThemeMode } from '@/app/app-slice.ts'

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const userLogin = useAppSelector(selectUserData)

  const dispatch = useAppDispatch()

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <AppBar position="static" sx={{ mb: '30px' }} enableColorOnDark={false}>
      <Toolbar>
        <Container maxWidth={'lg'} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            {isLoggedIn && <span>{userLogin}</span>}
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
