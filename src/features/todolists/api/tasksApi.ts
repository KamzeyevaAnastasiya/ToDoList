import { instance } from '@/common/instance'
import type { DefaultBaseResponse } from '@/common/types'
import type { DefaultTaskResponse, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask({ todolistId, title }: { todolistId: string; title: string }) {
    return instance.post<DefaultTaskResponse>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask({ todolistId, taskId }: { todolistId: string; taskId: string }) {
    return instance.delete<DefaultBaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask({ todolistId, taskId, model }: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    return instance.put<DefaultTaskResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
