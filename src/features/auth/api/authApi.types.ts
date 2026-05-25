import { captchaSchema, loginInputsSchema, loginResponseSchema, meResponseSchema } from '@/features/auth/lib/schemas'
import { z } from 'zod'

export type LoginInputs = z.infer<typeof loginInputsSchema>

export type LoginResponse = z.infer<typeof loginResponseSchema>

export type MeResponse = z.infer<typeof meResponseSchema>

export type CaptchaResponse = z.infer<typeof captchaSchema>
