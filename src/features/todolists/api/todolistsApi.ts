import { baseApi } from '@/app/baseApi'
import type { DefaultBaseResponse } from '@/common/types'
import type { CreateTodolistResponse, Todolist } from '@/features/todolists/api/todolistsApi.types'
import type { DomainTodolist } from '@/features/todolists/lib/types'

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getTodolists: build.query<DomainTodolist[], void>({
        query: () => ({
          method: 'get',
          url: '/todo-lists',
        }),
        transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
          todolists.map((todolist) => ({ ...todolist, filter: 'All', entityStatus: 'idle' })),
        providesTags: ['Todolist'],
      }),
      createTodolist: build.mutation<CreateTodolistResponse, string>({
        query: (title) => ({
          method: 'post',
          url: '/todo-lists',
          body: { title },
        }),
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
} = todolistsApi
