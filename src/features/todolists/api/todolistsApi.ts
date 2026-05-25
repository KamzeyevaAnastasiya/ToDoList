import { baseApi } from '@/app/baseApi'
import { defaultBaseResponseSchema } from '@/common/schemas'
import type { DefaultBaseResponse } from '@/common/types'
import { withZodCatch } from '@/common/utils/withZodCatch'
import type { CreateTodolistResponse } from '@/features/todolists/api/todolistsApi.types'
import { createTodolistResponseSchema, todolistSchema } from '@/features/todolists/lib/schemas'
import type { DomainTodolist } from '@/features/todolists/lib/types'

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getTodolists: build.query<DomainTodolist[], void>({
        query: () => ({
          method: 'get',
          url: '/todo-lists',
        }),
        transformResponse: (response: unknown): DomainTodolist[] => {
          const parsed = todolistSchema.array().safeParse(response)
          if (!parsed.success) {
            console.error('Zod validation failed for todolists:', parsed.error.issues)
            return [] // или выбросить ошибку, если хотите показать fallback UI
          }
          return parsed.data.map((todolist) => ({ ...todolist, filter: 'All', entityStatus: 'idle' }))
        },
        providesTags: ['Todolist'],
      }),
      createTodolist: build.mutation<CreateTodolistResponse, string>({
        query: (title) => ({
          method: 'post',
          url: '/todo-lists',
          body: { title },
        }),
        ...withZodCatch(createTodolistResponseSchema),
        invalidatesTags: ['Todolist'],
      }),
      deleteTodolist: build.mutation<DefaultBaseResponse, string>({
        query: (id) => ({
          method: 'delete',
          url: `/todo-lists/${id}`,
        }),
        async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
              const index = state.findIndex((todolist) => todolist.id === id)
              if (index !== -1) {
                state.splice(index, 1)
              }
            }),
          )
          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Todolist'],
      }),
      updateTodolistTitle: build.mutation<DefaultBaseResponse, { id: string; title: string }>({
        query: ({ id, title }) => ({
          method: 'put',
          url: `/todo-lists/${id}`,
          body: { title },
        }),
        ...withZodCatch(defaultBaseResponseSchema),
        invalidatesTags: ['Todolist'],
      }),
      reorderTodolist: build.mutation<DefaultBaseResponse, { id: string; putAfterItemId: string | null }>({
        query: ({ id, putAfterItemId }) => ({
          method: 'put',
          url: `/todo-lists/${id}/reorder`,
          body: { putAfterItemId },
        }),
        async onQueryStarted({ id, putAfterItemId }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
              const oldIndex = state.findIndex((t) => t.id === id)
              if (oldIndex === -1) return
              const [movedItem] = state.splice(oldIndex, 1)
              if (!putAfterItemId) {
                state.unshift(movedItem)
                return
              }
              const afterIndex = state.findIndex((t) => t.id === putAfterItemId)
              if (afterIndex === -1) {
                state.splice(oldIndex, 0, movedItem)
                return
              }
              state.splice(afterIndex + 1, 0, movedItem)
            }),
          )
          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        ...withZodCatch(defaultBaseResponseSchema),
        invalidatesTags: ['Todolist'],
      }),
    }
  },
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useUpdateTodolistTitleMutation,
  useReorderTodolistMutation,
} = todolistsApi
