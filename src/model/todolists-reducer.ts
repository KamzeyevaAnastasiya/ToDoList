import {FilterValues, Todolist} from "../app/App.tsx";
import {v1} from "uuid";


const initialState: Todolist[] = []


type Actions = CreateTodolistAction  | DeleteTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction


export const createTodolistAC = (title: string) => {
    return {type: 'create_todolist', payload: {id: v1(), title}} as const
}
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export const changeTodolistTitleAC = ({id, title}: { id: string, title: string }) => {
    return {type: 'change_todolistTitle', payload: {id, title}} as const
}
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistFilterAC = ({id, filter}: { id: string, filter: FilterValues }) => {
    return {type: 'change_todolistFilter', payload: {id, filter}} as const
}
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>


export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'create_todolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'All'}
            return [...state, newTodolist]
        }
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'change_todolistTitle': {
            return state.map(todolist => action.payload.id === todolist.id ? {
                ...todolist,
                title: action.payload.title
            } : todolist)
        }
        case 'change_todolistFilter': {
            return state.map(todolist => action.payload.id === todolist.id ? {
                ...todolist,
                filter: action.payload.filter
            } : todolist)
        }
        default:
            return state
    }
}