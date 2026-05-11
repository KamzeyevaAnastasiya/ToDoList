import { useAppSelector } from '@/common/hooks'
import { Path } from '@/common/routing'
import { selectIsLoggedIn } from '@/features/auth/model/auth-slice'
import { Navigate } from 'react-router'

export const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }
}
