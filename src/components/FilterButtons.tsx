import Button from '@mui/material/Button';
import {FilterValues} from '../app/App.tsx';


type ButtonType = {
    todolistId: string
    filter: FilterValues
    changeTodolistFilter: (todolistId: string, nextFilter: FilterValues) => void
}


export const FilterButtons = ({todolistId, filter, changeTodolistFilter}: ButtonType) => {
    const changeFilterHandler = (filter: FilterValues) => {
        changeTodolistFilter(todolistId, filter)
    }


    return (
        <div>
            <Button variant={filter === 'All' ? 'outlined' : 'text'} color={'inherit'} onClick={() => changeFilterHandler('All')}>All</Button>
            <Button variant={filter === 'Active' ? 'outlined' : 'text'} color={'primary'} onClick={() => changeFilterHandler('Active')}>Active</Button>
            <Button variant={filter === 'Completed' ? 'outlined' : 'text'} color={'secondary'} onClick={() => changeFilterHandler('Completed')}>Completed</Button>

        </div>
    )
}