import {TaskType} from '../App'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {ChangeEvent} from 'react';
import {EditableSpan} from './EditableSpan.tsx';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import {containerSx, listItemSx} from './TasksList.styles.ts';


type TasksListProps = {
    todolistId: string
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: TaskType['id']) => void
    changeStatusTask: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, title: string, taskId: TaskType['id']) => void
}


export const TasksList = ({todolistId, tasks, deleteTask, changeStatusTask, changeTaskTitle}: TasksListProps) => {

    const tasksList = tasks.length === 0
        ? <span>Ваш список пуст</span>
        : <List>
            {tasks.map(tasks => {
                const onClickButtonHandler = () => {
                    deleteTask(todolistId, tasks.id)
                }

                const onChangeStatusTask = (event: ChangeEvent<HTMLInputElement>) => {
                    changeStatusTask(todolistId, tasks.id, event.currentTarget.checked)
                }

                const onChangeTaskTitle = (title: string) => {
                    changeTaskTitle(todolistId, title, tasks.id)
                }

                return (
                    <ListItem key={tasks.id}
                              sx={listItemSx(tasks.isDone)}>
                        <div>
                            <Checkbox
                                checked={tasks.isDone}
                                onChange={onChangeStatusTask}
                            />
                            <EditableSpan value={tasks.title} onChange={onChangeTaskTitle}/>
                        </div>
                        <IconButton onClick={onClickButtonHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>
                )
            })}
        </List>


    return (
        <Box sx={containerSx}>{tasksList}</Box>
    )
}