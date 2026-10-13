import { SxProps } from '@mui/material'

export const getListItemSx = (isDone: boolean): SxProps => ({
  p: 0,
  justifyContent: 'space-between',
  opacity: isDone ? 0.5 : 1,

  '& > div': {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    flex: 1,
  },

  '& > div > span': {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    overflowWrap: 'break-word',
    lineHeight: 1.4,
    minWidth: 0,
  },
})
