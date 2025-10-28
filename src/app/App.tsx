import './App.css'
import {TodolistItem} from '../components/TodolistItem.tsx'
import {useCallback, useMemo, useState} from 'react';
import {AddItemForm} from '../components/AddItemForm.tsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import {containerSx} from '../components/TasksList.styles.ts';
import {NavButton} from '../components/NavButton.ts';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "../model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC
} from "../model/tasks-reducer.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectTasks} from "../model/tasks-selectors.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";


export type FilterValues = 'All' | 'Active' | 'Completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [todolistId: string]: TaskType []
}

type ThemeMode = 'dark' | 'light'

export const App = () => {

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const createTodolist = useCallback((title: string) => {
        dispatch(createTodolistAC(title))
    }, [dispatch])

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
    }, [dispatch])

    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }, [dispatch])


    const createTask = useCallback((todolistId: string, title: string) => {
        dispatch(createTaskAC(todolistId, title))
    }, [dispatch])

    const deleteTask = useCallback((todolistId: string, taskId: TaskType['id']) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }, [dispatch])

    const changeStatusTask = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, title: string, taskId: TaskType['id']) => {
        dispatch(changeTaskTitleAC({todolistId, title, taskId}))
    }, [dispatch])


    const todolistComponents = useMemo(() =>
        todolists && todolists.map(todolist => {
            return (
                <Grid key={todolist.id}>
                    <Paper sx={{p: '0 20px 20px 20px'}}>
                        <TodolistItem
                            todolistId={todolist.id}
                            title={todolist.title}
                            filter={todolist.filter}
                            tasks={tasks[todolist.id]}
                            deleteTask={deleteTask}
                            changeTodolistFilter={changeTodolistFilter}
                            createTask={createTask}
                            changeStatusTask={changeStatusTask}
                            deleteTodolist={deleteTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            )
        }), [todolists, tasks])


    const theme = useMemo(() => createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: 'rgb(120,168,133)'
            }
        }
    }), [themeMode])

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }


    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}} enableColorOnDark={false}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign out</NavButton>
                                <NavButton background={theme.palette.primary.dark}>FAQ</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>

                <Container maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
                        <AddItemForm createItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolistComponents}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}

