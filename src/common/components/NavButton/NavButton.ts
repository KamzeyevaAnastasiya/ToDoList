import { styled } from '@mui/material/styles'
import Button, { type ButtonProps } from '@mui/material/Button'
import { LinkProps } from 'react-router'

type Props = {
  background?: string
  to?: string
}

export const NavButton = styled(Button)<ButtonProps & Partial<LinkProps> & Props>(({ background, theme }) => ({
  minWidth: '110px',
  fontWeight: 'bold',
  boxShadow: '0 0 0 2px ${theme.palette.primary.dark}, 4px 4px 0 0 ${theme.palette.primary.dark}',
  borderRadius: '2px',
  textTransform: 'none',
  margin: '0 10px',
  padding: '8px 24px',
  color: '#ffffff',
  background: background || theme.palette.primary.light,
}))
