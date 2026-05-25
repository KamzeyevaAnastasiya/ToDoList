import { baseApi } from '@/app/baseApi'
import { PAGE_SIZE } from '@/common/constants'
import { defaultBaseResponseSchema } from '@/common/schemas'
import type { DefaultBaseResponse } from '@/common/types'
import { withZodCatch } from '@/common/utils/withZodCatch'
import type { DefaultTaskResponse, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import { defaultTaskResponseSchema, getTasksResponseSchema } from '@/features/todolists/lib/schemas'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getTasks: build.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
        query: ({ todolistId, params }) => ({
          method: 'get',
          url: `/todo-lists/${todolistId}/tasks`,
          params: { ...params, count: PAGE_SIZE },
        }),
        ...withZodCatch(getTasksResponseSchema),
        providesTags: (_res, _err, { todolistId }) => [{ type: 'Task', id: todolistId }],
      }),
      createTask: build.mutation<DefaultTaskResponse, { todolistId: string; title: string }>({
        query: ({ todolistId, title }) => ({
          method: 'post',
          url: `/todo-lists/${todolistId}/tasks`,
          body: { title },
        }),
        ...withZodCatch(defaultTaskResponseSchema),
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
        ...withZodCatch(defaultTaskResponseSchema),
        invalidatesTags: (_res, _err, { todolistId }) => [{ type: 'Task', id: todolistId }],
      }),
      reorderTask: build.mutation<
        DefaultBaseResponse,
        { todolistId: string; taskId: string; putAfterItemId: string | null }
      >({
        query: ({ todolistId, taskId, putAfterItemId }) => ({
          method: 'put',
          url: `/todo-lists/${todolistId}/tasks/${taskId}/reorder`,
          body: { putAfterItemId },
        }),
        async onQueryStarted({ todolistId, taskId, putAfterItemId }, { dispatch, queryFulfilled, getState }) {
          const cachedArgs = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks')
          let patchResults: any[] = []
          cachedArgs.forEach(({ params }) => {
            patchResults.push(
              dispatch(
                tasksApi.util.updateQueryData('getTasks', { todolistId, params: { page: params.page } }, (state) => {
                  const oldIndex = state.items.findIndex((t) => t.id === taskId)
                  if (oldIndex === -1) return
                  const [movedItem] = state.items.splice(oldIndex, 1)
                  if (!putAfterItemId) {
                    state.items.unshift(movedItem)
                    return
                  }
                  const afterIndex = state.items.findIndex((t) => t.id === putAfterItemId)
                  if (afterIndex === -1) {
                    state.items.splice(oldIndex, 0, movedItem)
                    return
                  }
                  state.items.splice(afterIndex + 1, 0, movedItem)
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
        ...withZodCatch(defaultBaseResponseSchema),
        invalidatesTags: (_res, _err, { todolistId }) => [{ type: 'Task', id: todolistId }],
      }),
    }
  },
})

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useReorderTaskMutation,
} = tasksApi
