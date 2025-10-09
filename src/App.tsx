import './App.css'
import {TodolistItem} from './components/TodolistItem'
import {useReducer, useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm.tsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import {containerSx} from './components/TasksList.styles.ts';
import {NavButton} from './components/NavButton.ts';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";


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
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        setTasks({...tasks, [action.payload.id]: []})
    }

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchToTodolists(action)
        delete tasks[action.payload.id]
        setTasks({...tasks})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC({id: todolistId, title})
        dispatchToTodolists(action)
    }

    const changeTodolistFilter = (todolistId: string, filter: FilterValues) => {
        const action = changeTodolistFilterAC({id: todolistId, filter})
        dispatchToTodolists(action)
    }


    const createTask = (todolistId: string, title: string) => {
        setTasks({
            ...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]
        })
    }

    const deleteTask = (todolistId: string, taskId: TaskType['id']) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const changeStatusTask = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }

    const changeTaskTitle = (todolistId: string, title: string, taskId: TaskType['id']) => {
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId].map(task => taskId === task.id ? {...task, title: title} : task)]
        })
    }


    const todolistComponents = todolists && todolists.map(todolist => {

        let filteredTasks = tasks[todolist.id]
        if (todolist.filter === 'Active') {
            filteredTasks = tasks[todolist.id].filter(t => !t.isDone)
        }
        if (todolist.filter === 'Completed') {
            filteredTasks = tasks[todolist.id].filter(t => t.isDone)
        }

        return (
            <Grid key={todolist.id}>
                <Paper sx={{p: '0 20px 20px 20px'}}>
                    <TodolistItem
                        todolistId={todolist.id}
                        title={todolist.title}
                        filter={todolist.filter}
                        tasks={filteredTasks}
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
    })


    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: 'rgb(120,168,133)'
            }
        }
    })

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

