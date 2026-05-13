import { AUTH_TOKEN } from '@/common/constants'
import { instance } from '@/common/instance'
import type { DefaultBaseResponse } from '@/common/types'
import type { CreateTodolistResponse, Todolist } from '@/features/todolists/api/todolistsApi.types'
import type { DomainTodolist } from '@/features/todolists/model/todolists-slice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todolistsApi = createApi({
  reducerPath: 'todolistsApi',
  tagTypes: ['Todolist'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
  }),
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

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>('/todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<CreateTodolistResponse>('/todo-lists', { title })
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<DefaultBaseResponse>(`/todo-lists/${id}`, { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<DefaultBaseResponse>(`/todo-lists/${id}`)
  },
}
