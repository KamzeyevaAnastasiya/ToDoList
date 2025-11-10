import Button from '@mui/material/Button';
import {FilterValues, Todolist} from '@/app/App.tsx';
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTodolistFilterAC} from "@/features/todolists/model/todolists-reducer.ts";

import Box from "@mui/material/Box";
import {containerSx} from "@/common/styles/container.styles.ts";

type Props = {
    todolist: Todolist
}

export const FilterButtons = ({todolist}: Props) => {
    const {id, filter} = todolist

    const dispatch = useAppDispatch()

    const changeTodolistFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    return (
        <Box sx={containerSx}>
            <Button variant={filter === 'All' ? 'outlined' : 'text'} color={'inherit'}
                    onClick={() => changeTodolistFilter('All')}>All</Button>
            <Button variant={filter === 'Active' ? 'outlined' : 'text'} color={'primary'}
                    onClick={() => changeTodolistFilter('Active')}>Active</Button>
            <Button variant={filter === 'Completed' ? 'outlined' : 'text'} color={'secondary'}
                    onClick={() => changeTodolistFilter('Completed')}>Completed</Button>
        </Box>
    )
}