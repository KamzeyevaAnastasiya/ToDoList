import {Button} from './Button'
import {FilterValues} from '../App.tsx';

type ButtonType = {
    changeFilter: (nextFilter: FilterValues) => void
}

export const FilterButtons = ({changeFilter}: ButtonType) => {
    return (
        <div>
            <Button title={'All'} onClickHandler={() => changeFilter('All')}/>
            <Button title={'Active'} onClickHandler={() => changeFilter('Active')}/>
            <Button title={'Completed'} onClickHandler={() => changeFilter('Comleted')}/>
        </div>
    )
}