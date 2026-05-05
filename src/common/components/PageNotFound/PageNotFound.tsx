import { Path } from '@/common/routing'
import { NavButton } from '@/common/components'
import styles from './PageNotFound.module.css'
import { Link } from 'react-router'

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <NavButton component={Link} to={Path.Main}>
        On main page
      </NavButton>
    </div>
  </>
)
