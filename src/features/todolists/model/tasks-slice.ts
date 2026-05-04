import { setAppErrorAC, setAppStatusAC } from '@/app/app-slice'
import type { TasksState } from '@/app/App.tsx'
import type { RootState } from '@/app/store'
import { ResultCode } from '@/common/enums'
import { createAppSlice } from '@/common/utils'
import { tasksApi } from '@/features/todolists/api/tasksApi'
import type { UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import { createTodolistTC, deleteTodolistTC } from '@/features/todolists/model/todolists-slice'

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TasksState,
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
  },
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await tasksApi.getTasks(todolistId)
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return { todolistId, tasks: res.data.items }
        } catch (error) {
          dispatch(setAppStatusAC({ status: 'failed' }))
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
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            return { task: res.data.data.item }
          } else {
            if (res.data.messages.length) {
              dispatch(setAppErrorAC({ error: res.data.messages[0] }))
            } else {
              dispatch(setAppErrorAC({ error: 'Some error occurred' }))
            }
            dispatch(setAppStatusAC({ status: 'failed' }))
            return rejectWithValue(null)
          }
        } catch (error: any) {
          dispatch(setAppErrorAC({ error: error.message }))
          dispatch(setAppStatusAC({ status: 'failed' }))
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
          await tasksApi.deleteTask(payload)
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return payload
        } catch (error) {
          dispatch(setAppStatusAC({ status: 'failed' }))
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
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return res.data.data.item
        } catch (error) {
          dispatch(setAppStatusAC({ status: 'failed' }))
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
