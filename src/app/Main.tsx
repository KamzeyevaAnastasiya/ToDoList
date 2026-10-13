import { useCreateTodolistMutation } from '@/features/todolists/api/todolistsApi'
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm.tsx'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists.tsx'

export const Main = () => {
  const [createTodolist] = useCreateTodolistMutation()

  return (
    <Container maxWidth={'lg'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        <CreateItemForm onCreateItem={createTodolist} />
        <Todolists />
      </Box>
    </Container>
  )
}
