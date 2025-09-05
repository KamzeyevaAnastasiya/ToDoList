import {Button} from './Button'
import {FilterValues} from '../App.tsx';


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
            <Button className={filter === 'All' ? 'active-filter' : ''} title={'All'}
                    onClickHandler={() => changeFilterHandler('All')}/>
            <Button className={filter === 'Active' ? 'active-filter' : ''} title={'Active'}
                    onClickHandler={() => changeFilterHandler('Active')}/>
            <Button className={filter === 'Completed' ? 'active-filter' : ''} title={'Completed'}
                    onClickHandler={() => changeFilterHandler('Completed')}/>
        </div>
    )
}