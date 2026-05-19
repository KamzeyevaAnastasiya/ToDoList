import { baseApi } from '@/app/baseApi'
import { PAGE_SIZE } from '@/common/constants'
import type { DefaultBaseResponse } from '@/common/types'
import type { DefaultTaskResponse, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getTasks: build.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
        query: ({ todolistId, params }) => ({
          method: 'get',
          url: `/todo-lists/${todolistId}/tasks`,
          params: { ...params, count: PAGE_SIZE },
        }),
        providesTags: (_res, _err, { todolistId }) => [{ type: 'Task', id: todolistId }],
      }),
      createTask: build.mutation<DefaultTaskResponse, { todolistId: string; title: string }>({
        query: ({ todolistId, title }) => ({
          method: 'post',
          url: `/todo-lists/${todolistId}/tasks`,
          body: { title },
        }),
        invalidatesTags: (_res, _err, { todolistId }) => [{ type: 'Task', id: todolistId }],
      }),
      deleteTask: build.mutation<DefaultBaseResponse, { todolistId: string; taskId: string }>({
        query: ({ todolistId, taskId }) => ({
          method: 'delete',
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        }),
        invalidatesTags: (_res, _err, { todolistId }) => [{ type: 'Task', id: todolistId }],
      }),
      updateTask: build.mutation<DefaultTaskResponse, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
        query: ({ todolistId, taskId, model }) => ({
          method: 'put',
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
          body: model,
        }),
        async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
          const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks')
          let patchResults: any[] = []
          cachedArgsForQuery.forEach(({ params }) => {
            patchResults.push(
              dispatch(
                tasksApi.util.updateQueryData('getTasks', { todolistId, params: { page: params.page } }, (state) => {
                  const index = state.items.findIndex((task) => task.id === taskId)
                  if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...model }
                  }
                }),
              ),
            )
          })
          try {
            await queryFulfilled
          } catch {
            patchResults.forEach((patchResult) => {
              patchResult.undo()
            })
          }
        },
        invalidatesTags: (_res, _err, { todolistId }) => [{ type: 'Task', id: todolistId }],
      }),
    }
  },
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
