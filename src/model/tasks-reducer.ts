import type {TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";
import {v1} from "uuid";

const initialState: TasksState = {}

type Actions = CreateTodolistAction | DeleteTodolistAction | CreateTaskAction | DeleteTaskAction

export const createTaskAC = ({todolistId, title}:  {todolistId: string, title: string}) => {
    return {type: 'task/createTask', payload: {todolistId, title}} as const
}
export type CreateTaskAction = ReturnType<typeof createTaskAC>

export const deleteTaskAC = ({todolistId, taskId}:  {todolistId: string, taskId: string}) => {
    return {type: 'task/deleteTask', payload: {todolistId, taskId}} as const
}
export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>




export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'todolist/createTodolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'todolist/deleteTodolist': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case 'task/createTask': {
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], {id: action.payload.todolistId, title: action.payload.title, isDone: false}]}
        }
        case 'task/deleteTask': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
        }

        default:
            return state
    }
}


