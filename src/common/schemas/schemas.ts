import { ResultCode } from '@/common/enums'
import { z } from 'zod'

export const fieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
})

export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    resultCode: z.enum(ResultCode),
    messages: z.string().array(),
    fieldsErrors: fieldErrorSchema.array(),
  })

export const defaultBaseResponseSchema = baseResponseSchema(z.object({}))
