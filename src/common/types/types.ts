import { defaultBaseResponseSchema } from '@/common/schemas'
import { z } from 'zod'

export type DefaultBaseResponse = z.infer<typeof defaultBaseResponseSchema>

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
