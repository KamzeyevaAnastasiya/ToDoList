import { setAppStatusAC } from '@/app/app-slice'
import type { RootState } from '@/app/store'
import { clearDataAC } from '@/common/actions'
import { ResultCode } from '@/common/enums'
import { defaultBaseResponseSchema } from '@/common/types'
import { createAppSlice, handleServerAppError, handleServerNetworkError } from '@/common/utils'
import { tasksApi } from '@/features/todolists/api/tasksApi'
import {
  defaultTaskResponseSchema,
  type DomainTask,
  domainTaskSchema,
  type UpdateTaskModel,
} from '@/features/todolists/api/tasksApi.types'
import { createTodolistTC, deleteTodolistTC } from '@/features/todolists/model/todolists-slice'

const initialState = {} as TasksState

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState,
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(clearDataAC, () => {
        return initialState
      })
  },
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await tasksApi.getTasks(todolistId)
          domainTaskSchema.array().parse(res.data.items)
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return { todolistId, tasks: res.data.items }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await tasksApi.createTask(payload)
          defaultTaskResponseSchema.parse(res.data)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            return { task: res.data.data.item }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await tasksApi.deleteTask(payload)
          defaultBaseResponseSchema.parse(res.data)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            return payload
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId]
          if (tasks) {
            const taskIndex = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (taskIndex !== -1) {
              tasks.splice(taskIndex, 1)
            }
          }
        },
      },
    ),
    updateTaskTC: create.asyncThunk(
      async (
        {
          todolistId,
          taskId,
          domainModel,
        }: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
        { dispatch, rejectWithValue, getState },
      ) => {
        const allTodolistTasks = (getState() as RootState).tasks[todolistId]
        const task = allTodolistTasks.find((task) => task.id === taskId)

        if (!task) {
          return rejectWithValue(null)
        }

        const model: UpdateTaskModel = {
          description: task.description,
          title: task.title,
          status: task.status,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          ...domainModel,
        }

        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await tasksApi.updateTask({ todolistId, taskId, model })
          defaultTaskResponseSchema.parse(res.data)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            return res.data.data.item
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todoListId]
          const index = tasks.findIndex((task) => task.id === action.payload.id)
          if (index !== -1) {
            tasks[index] = action.payload
          }
        },
      },
    ),
  }),
})

export const { selectTasks } = tasksSlice.selectors
export const { fetchTasksTC, createTaskTC, deleteTaskTC, updateTaskTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export type TasksState = {
  [todolistId: string]: DomainTask[]
}
