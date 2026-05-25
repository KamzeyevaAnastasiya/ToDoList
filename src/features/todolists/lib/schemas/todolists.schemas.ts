import { baseResponseSchema } from '@/common/schemas'
import { z } from 'zod'

export const todolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.iso.datetime({ local: true }),
  order: z.number(),
})

export const createTodolistResponseSchema = baseResponseSchema(z.object({ item: todolistSchema }))
