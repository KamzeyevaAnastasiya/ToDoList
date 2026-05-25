import { TaskPriority, TaskStatus } from '@/common/enums'
import { defaultTaskResponseSchema, domainTaskSchema, getTasksResponseSchema } from '@/features/todolists/lib/schemas'
import { z } from 'zod'

export type DomainTask = z.infer<typeof domainTaskSchema>

export type GetTasksResponse = z.infer<typeof getTasksResponseSchema>

export type DefaultTaskResponse = z.infer<typeof defaultTaskResponseSchema>

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
