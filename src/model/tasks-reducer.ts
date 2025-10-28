import type {TasksState} from '../app/App.tsx'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";


const initialState: TasksState = {}

export const createTaskAC = createAction('tasks/createTask',
    (todolistId: string, title: string) => ({payload: {todolistId, title, id: nanoid()}}))

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')

export const changeTaskStatusAC = createAction<{
    todolistId: string,
    taskId: string,
    isDone: boolean
}>('tasks/changeTaskStatus')

export const changeTaskTitleAC = createAction<{
    todolistId: string,
    taskId: string,
    title: string
}>('tasks/changeTaskTitle')


export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTaskAC, (state, action) => {
            const tasks = state[action.payload.todolistId]
            if (tasks) {
                tasks.unshift({id: action.payload.id, title: action.payload.title, isDone: false})
            }
        })
        .addCase(deleteTaskAC, (state, action) => {
            const tasks = state[action.payload.todolistId]
            if (tasks) {
                const taskIndex = tasks.findIndex(task => task.id === action.payload.taskId)
                if (taskIndex !== -1) {
                    tasks.splice(taskIndex, 1)
                }
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const tasks = state[action.payload.todolistId]
            if (tasks) {
                const task = tasks.find(task => task.id === action.payload.taskId)
                if (task) {
                    task.isDone = action.payload.isDone
                }
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const tasks = state[action.payload.todolistId]
            if (tasks) {
                const task = tasks.find(task => task.id === action.payload.taskId)
                if (task) {
                    task.title = action.payload.title
                }
            }
        })
})

