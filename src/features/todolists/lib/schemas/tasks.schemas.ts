import { TaskPriority, TaskStatus } from '@/common/enums'
import { baseResponseSchema } from '@/common/schemas'
import { z } from 'zod'

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  deadline: z.string().nullable(),
  startDate: z.string().nullable(),
  title: z.string(),
  id: z.string(),
  todoListId: z.string(),
  order: z.int(),
  addedDate: z.iso.datetime({ local: true }),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
})

export const getTasksResponseSchema = z.object({
  error: z.string().nullable(),
  totalCount: z.number(),
  items: domainTaskSchema.array(),
})

export const defaultTaskResponseSchema = baseResponseSchema(z.object({ item: domainTaskSchema }))
