import {Todolist} from "../App.tsx";

const initialState: Todolist[] = []

type Actions = DeleteTodolistAction

export const deleteTodolistAC = (id: string) => {
    return {type: 'todolist/deleteTodolist', payload: { id }} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>


export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'todolist/deleteTodolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        default:
            return state
    }
}