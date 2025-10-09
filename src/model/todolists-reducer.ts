import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

const initialState: Todolist[] = []

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction

export const deleteTodolistAC = (id: string) => {
    return {type: 'todolist/deleteTodolist', payload: { id }} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export const createTodolistAC = (title: string) => {
    return {type: 'todolist/createTodolist', payload: {  id: v1(), title }} as const
}

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

export const changeTodolistTitleAC = ({id, title}: {id: string, title: string}) => {
    return {type: 'todolist/changeTodolistTitle', payload: {  id, title }} as const
}

export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistFilterAC = ({id, filter}: {id: string, filter: FilterValues}) => {
    return {type: 'todolist/changeTodolistFilter', payload: {  id, filter }} as const
}

export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>


export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'todolist/deleteTodolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'todolist/createTodolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'All'}
            return [...state, newTodolist]
        }
        case 'todolist/changeTodolistTitle': {
            return state.map(todolist => action.payload.id === todolist.id ? {...todolist, title: action.payload.title} : todolist)
        }
        case 'todolist/changeTodolistFilter': {
            return state.map(todolist => action.payload.id === todolist.id ? {...todolist, filter: action.payload.filter} : todolist)
        }

        default:
            return state
    }
}