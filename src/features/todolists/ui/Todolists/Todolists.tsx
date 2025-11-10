import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/features/todolists/model/todolists-selectors.ts";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists && todolists.map(todolist => {
                return (
                    <Grid key={todolist.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <TodolistItem todolist={todolist}/>
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};

