import './App.css'
import {TodolistItem} from './components/TodolistItem'
import {useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm.tsx';


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


export const App = () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist []>([
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

    const deleteTask = (todolistId: string, taskId: TaskType['id']) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const createTask = (todolistId: string, title: string) => {
        setTasks({
            ...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]
        })
    }

    const changeTodolistFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }

    const changeStatusTask = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const createTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: Todolist = {id: todolistId, title: title, filter: 'All'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistId]: []})
    }

    const changeTaskTitle = (todolistId: string, title: string, taskId: TaskType['id']) => {
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId].map(task => taskId === task.id ? {...task, title: title} : task)]
        })
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist => todolistId === todolist.id ? {...todolist, title: title} : todolist))
    }

    const todolistComponents = todolists.map(todolist => {

        let filteredTasks = tasks[todolist.id]
        if (todolist.filter === 'Active') {
            filteredTasks = tasks[todolist.id].filter(t => !t.isDone)
        }
        if (todolist.filter === 'Completed') {
            filteredTasks = tasks[todolist.id].filter(t => t.isDone)
        }

        return (
            <TodolistItem
                key={todolist.id}
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
        )
    })


    return (
        <div className="app">
            <AddItemForm onCreateItem={createTodolist}/>
            {todolistComponents}
        </div>
    )
}

