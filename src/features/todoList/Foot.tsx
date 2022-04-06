import { FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import {
    removeCompleted,
    changeShow,
} from './TodoSlice'

const Foot = ({ itemleft }: { itemleft: number }) => {

    const dispatch = useDispatch()

    const handleDel = () => {
        dispatch(removeCompleted())
    }

    const handleChange = (event:FormEvent) => {
        dispatch(changeShow(event.currentTarget.innerHTML))
    }

    return (
        <div className='flex justify-around'>
            <span>{itemleft} items left</span>
            <div className='flex justify-between w-1/3'>
                <button onClick={handleChange}>All</button>
                <button onClick={handleChange}>Active</button>
                <button onClick={handleChange}>Complete</button>
            </div>
            <button onClick={handleDel}>Clear completed</button>
        </div>
    )
}

export default Foot