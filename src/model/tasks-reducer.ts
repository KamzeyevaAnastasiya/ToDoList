import type {TasksState} from '../app/App.tsx'
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";
import {v1} from "uuid";


const initialState: TasksState = {}

type Actions =
    CreateTodolistAction
    | DeleteTodolistAction
    | CreateTaskAction
    | DeleteTaskAction
    | ChangeTaskStatusAction
    | ChangeTaskTitleAction

export const createTaskAC = ({todolistId, title}: { todolistId: string, title: string }) => {
    return {type: 'create_task', payload: {todolistId, title}} as const
}
export type CreateTaskAction = ReturnType<typeof createTaskAC>

export const deleteTaskAC = ({todolistId, taskId}: { todolistId: string, taskId: string }) => {
    return {type: 'delete_task', payload: {todolistId, taskId}} as const
}
export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>

export const changeTaskStatusAC = ({todolistId, taskId, isDone}: {
    todolistId: string,
    taskId: string,
    isDone: boolean
}) => {
    return {type: 'change_taskStatus', payload: {todolistId, taskId, isDone}} as const
}
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>

export const changeTaskTitleAC = ({todolistId, taskId, title}: {
    todolistId: string,
    taskId: string,
    title: string
}) => {
    return {type: 'change_taskTitle', payload: {todolistId, taskId, title}} as const
}
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>


export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'delete_todolist': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case 'create_task': {
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId], {
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }]
            }
        }
        case 'delete_task': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }
        case 'change_taskStatus': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)
            }
        }
        case 'change_taskTitle': {
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId].map(task => action.payload.taskId === task.id ? {
                    ...task,
                    title: action.payload.title
                } : task)]
            }
        }
        default:
            return state
    }
}


