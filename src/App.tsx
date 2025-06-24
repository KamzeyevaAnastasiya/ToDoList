import './App.css'
import {TodolistItem} from './components/TodolistItem'
import {useState} from 'react';
import {v1} from 'uuid';

export type FilterValues = 'All' | 'Active' | 'Comleted'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const App = () => {
    const TodolistTitle = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ]
    )

    const deleteTask = (taskId: TaskType['id']) => {
        const nextState = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
    }

    const createTask = (title: string) => {
        const newTask: TaskType= {id: v1(), title, isDone: false}
        const newTasks: TaskType[] = [...tasks, newTask]
        setTasks(newTasks)
    }

    const [filter, setFilter] = useState<FilterValues>('All')

    const changeFilter = (nextFilter: FilterValues) => {
        setFilter(nextFilter)
    }
    let filteredTasks = tasks
    if (filter === 'Active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'Comleted') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    return (
        <div className="app">
            <TodolistItem
                title={TodolistTitle}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                createTask={createTask}
            />
        </div>
    )
}

