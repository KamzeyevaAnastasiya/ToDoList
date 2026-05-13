import { selectThemeMode, setIsLoggedInAC } from '@/app/app-slice'
import { AUTH_TOKEN } from '@/common/constants'
import { ResultCode } from '@/common/enums'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import { useLoginMutation } from '@/features/auth/api/authApi'
import { type LoginInputs, loginInputsSchema } from '@/features/auth/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import styles from './Login.module.css'

export const Login = () => {
  const [login] = useLoginMutation()

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginInputsSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    login(data).then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
        reset()
      }
    })
    reset()
  }

  return (
    <Grid container justifyContent={'center'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: '5px' }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <TextField {...field} label="Email" margin="normal" error={!!errors.email} />}
            />

            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="password" label="Password" margin="normal" error={!!errors.password} />
              )}
            />

            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}

            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name={'rememberMe'}
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />
                  )}
                />
              }
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}
