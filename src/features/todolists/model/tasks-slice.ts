import type { TasksState } from '@/app/App.tsx'
import { createTodolistTC, deleteTodolistTC } from '@/features/todolists/model/todolists-slice'
import { createSlice, nanoid } from '@reduxjs/toolkit'

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksState,
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
    createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      if (tasks) {
        tasks.unshift({ id: nanoid(), title: action.payload.title, isDone: false })
      }
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
          task.isDone = action.payload.isDone
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

export const { createTaskAC, deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
