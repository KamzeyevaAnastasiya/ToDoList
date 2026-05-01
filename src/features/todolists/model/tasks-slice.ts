import type { TasksState } from '@/app/App.tsx'
import { TaskPriority, TaskStatus } from '@/common/enums'
import { createAppSlice } from '@/common/utils'
import { tasksApi } from '@/features/todolists/api/tasksApi'
import type { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { createTodolistTC, deleteTodolistTC } from '@/features/todolists/model/todolists-slice'
import { nanoid } from '@reduxjs/toolkit'

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
    createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const newTask: DomainTask = {
        title: action.payload.title,
        todoListId: action.payload.todolistId,
        startDate: '',
        priority: TaskPriority.Low,
        description: '',
        deadline: '',
        status: TaskStatus.New,
        addedDate: '',
        order: 0,
        id: nanoid(),
      }
      state[action.payload.todolistId].unshift(newTask)
    }),
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      if (tasks) {
        const taskIndex = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1)
        }
      }
    }),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      if (tasks) {
        const task = tasks.find((task) => task.id === action.payload.taskId)
        if (task) {
          task.status = action.payload.isDone ? TaskStatus.Completed : TaskStatus.New
        }
      }
    }),
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
export const { fetchTasksTC, createTaskAC, deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
