import type { TasksState } from '@/app/App.tsx'
import type { RootState } from '@/app/store'
import { TaskStatus } from '@/common/enums'
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
      async (todolistId: string, thunkAPI) => {
        try {
          const res = await tasksApi.getTasks(todolistId)
          return { todolistId, tasks: res.data.items }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, thunkAPI) => {
        try {
          const res = await tasksApi.createTask(payload)
          return { task: res.data.data.item }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
        try {
          await tasksApi.deleteTask(payload)
          return payload
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
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
    changeTaskStatusTC: create.asyncThunk(
      async ({ todolistId, taskId, status }: { todolistId: string; taskId: string; status: TaskStatus }, thunkAPI) => {
        const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[todolistId]
        const task = allTodolistTasks.find((task) => task.id === taskId)

        if (!task) {
          return thunkAPI.rejectWithValue(null)
        }

        const model: UpdateTaskModel = {
          description: task.description,
          title: task.title,
          status,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
        }

        try {
          const res = await tasksApi.updateTask({ todolistId, taskId, model })
          return { task: res.data.data.item }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
          if (task) {
            task.status = action.payload.task.status
          }
        },
      },
    ),
    changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      if (tasks) {
        const task = tasks.find((task) => task.id === action.payload.taskId)
        if (task) {
          task.title = action.payload.title
        }
      }
    }),
  }),
})

export const { selectTasks } = tasksSlice.selectors
export const { fetchTasksTC, createTaskTC, deleteTaskTC, changeTaskStatusTC, changeTaskTitleAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
