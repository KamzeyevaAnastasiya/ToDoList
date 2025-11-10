import {Todolist} from '@/app/App.tsx'
import List from '@mui/material/List'
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Task/TaskItem.tsx";
import {selectTasks} from "@/features/todolists/model/tasks-selectors.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";

type Props = {
    todolist: Todolist
}

export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist;

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'Active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0
                ? <span>Ваш список пуст</span>
                : <List>
                    {filteredTasks.map(task =>
                        <TaskItem key={task.id} task={task} todolistId={id} />
                    )}
                </List>}

        </>
    )
}