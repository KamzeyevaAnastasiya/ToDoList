import {Todolist} from "../App.tsx";
import {v1} from "uuid";

const initialState: Todolist[] = []

type Actions = DeleteTodolistAction | CreateTodolistAction

export const deleteTodolistAC = (id: string) => {
    return {type: 'todolist/deleteTodolist', payload: { id }} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export const createTodolistAC = (title: string) => {
    return {type: 'todolist/createTodolist', payload: {  id: v1(), title }} as const
}

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>


export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'todolist/deleteTodolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'todolist/createTodolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'All'}
            return [...state, newTodolist]
        }
        default:
            return state
    }
}