import './App.css'
import {TodolistItem} from './components/TodolistItem'
import {useState} from 'react';

export type FilterValues = 'All' | 'Active' | 'Comleted'

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {
    const TodolistTitle = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>(
        [
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'React', isDone: false},
        ]
    )

    const deleteTask = (taskId: TaskType['id']) => {
        const nextState = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
    }

    const [filter, setFilter] = useState<FilterValues>('All')

    const changeFilter = (nextFilter: FilterValues) => {
        setFilter(nextFilter)
    }
    let filteredTasks = tasks
    if (filter === 'Active') {
        filteredTasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'Comleted') {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="app">
            <TodolistItem
                title={TodolistTitle}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

