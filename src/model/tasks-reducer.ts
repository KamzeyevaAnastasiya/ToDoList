import type {TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";

const initialState: TasksState = {}

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction

export const deleteTaskAC = ({id, taskId}:  {id: string, taskId: string}) => {
    return {type: 'task/deleteTask', payload: {id, taskId}} as const
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
        case 'task/deleteTask': {
            return {...state, [action.payload.id]: state[action.payload.id].filter(task => task.id !== action.payload.taskId)}
        }

        default:
            return state
    }
}


