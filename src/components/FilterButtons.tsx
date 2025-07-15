import {Button} from './Button'
import {FilterValues} from '../App.tsx';

type ButtonType = {
    changeFilter: (nextFilter: FilterValues) => void
    filter: FilterValues
}

export const FilterButtons = ({changeFilter, filter}: ButtonType) => {
    return (
        <div>
            <Button className={filter === 'All' ?'active-filter' : ''} title={'All'} onClickHandler={() => changeFilter('All')}/>
            <Button className={filter === 'Active' ?'active-filter' : ''} title={'Active'} onClickHandler={() => changeFilter('Active')}/>
            <Button className={filter === 'Completed' ?'active-filter' : ''} title={'Completed'} onClickHandler={() => changeFilter('Completed')}/>
        </div>
    )
}