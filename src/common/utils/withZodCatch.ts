import type { NamedSchemaError } from '@reduxjs/toolkit/query'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import type { ZodType } from 'zod'

export const withZodCatch = <T extends ZodType>(schema: T) => ({
  responseSchema: schema,
  catchSchemaFailure: (err: NamedSchemaError): FetchBaseQueryError => {
    console.error('Zod error. Details in the console', err.issues)

    return { status: 'CUSTOM_ERROR', error: 'Schema validation failed' }
  },
})
