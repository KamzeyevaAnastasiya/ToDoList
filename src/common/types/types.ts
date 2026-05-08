import { ResultCode } from '@/common/enums'
import { z } from 'zod'

const fieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
})

export type FieldError = z.infer<typeof fieldErrorSchema>

export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    resultCode: z.enum(ResultCode),
    messages: z.string().array(),
    fieldsErrors: fieldErrorSchema.array(),
  })

export const defaultBaseResponseSchema = baseResponseSchema(z.object({}))

export type DefaultBaseResponse = z.infer<typeof defaultBaseResponseSchema>

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
