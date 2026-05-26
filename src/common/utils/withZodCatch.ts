import type { NamedSchemaError } from '@reduxjs/toolkit/query'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-toastify'
import type { ZodType } from 'zod'

export const withZodCatch = <T extends ZodType>(schema: T) => ({
  responseSchema: schema,
  catchSchemaFailure: (err: NamedSchemaError): FetchBaseQueryError => {
    toast('Data format error. Please refresh the page or contact support.', { type: 'error', theme: 'colored' })
    console.error('Zod error. Details in the console', err.issues)
    return { status: 'CUSTOM_ERROR', error: 'Schema validation failed' }
  },
})
