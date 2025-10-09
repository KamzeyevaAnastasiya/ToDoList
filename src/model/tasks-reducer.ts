import type {TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";

const initialState: TasksState = {}

type Actions = CreateTodolistAction | DeleteTodolistAction



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
        default:
            return state
    }
}


