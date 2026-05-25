import { createTodolistResponseSchema, todolistSchema } from '@/features/todolists/lib/schemas'
import { z } from 'zod'

export type Todolist = z.infer<typeof todolistSchema>

export type CreateTodolistResponse = z.infer<typeof createTodolistResponseSchema>
