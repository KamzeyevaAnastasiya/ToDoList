import Button from '@mui/material/Button';
import {FilterValues} from '../app/App.tsx';
import * as React from "react";
import {useCallback} from "react";


type ButtonType = {
    todolistId: string
    filter: FilterValues
    changeTodolistFilter: (todolistId: string, nextFilter: FilterValues) => void
}


export const FilterButtons = React.memo(({todolistId, filter, changeTodolistFilter}: ButtonType) => {
    const changeFilterHandler = useCallback((filter: FilterValues) => {
        changeTodolistFilter(todolistId, filter)
    }, [todolistId])


    return (
        <div>
            <Button variant={filter === 'All' ? 'outlined' : 'text'} color={'inherit'} onClick={() => changeFilterHandler('All')}>All</Button>
            <Button variant={filter === 'Active' ? 'outlined' : 'text'} color={'primary'} onClick={() => changeFilterHandler('Active')}>Active</Button>
            <Button variant={filter === 'Completed' ? 'outlined' : 'text'} color={'secondary'} onClick={() => changeFilterHandler('Completed')}>Completed</Button>

        </div>
    )
})