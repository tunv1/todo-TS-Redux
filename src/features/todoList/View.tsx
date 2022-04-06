import React, { ChangeEvent, useState } from "react";
import { todoInit } from "./TodoSlice";
import { useDispatch } from "react-redux";
import {
    toggleCompleted,
    removeJob,
    editJob
} from './TodoSlice'

const View = ({ job }: { job: todoInit }) => {

    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('')

    const dispatch = useDispatch()

    const handleToggle = () => {
        dispatch(toggleCompleted(job.uId))
    }

    const handleDel = () => {
        dispatch(removeJob(job.uId))
    }

    const handleDoubleClick = () => {
        setEdit(true)
        setTitle(job.title)
    }

    const handleSubmit = () => {
        dispatch(editJob({uId: job.uId, title}))
        setEdit(false)
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if(event.keyCode === 27) {
            handleEsc()
        }        
    }

    const handleBlue = () => {
        if(title === job.title){
            handleEsc()
        }
        else {
            handleSubmit()
        }
    }

    const handleEsc = () => {
        setEdit(false)
    }

    return (
        <>
            {!edit && <div className='w-full relative group'>
                <input
                    checked={job.isCompleted}
                    onChange={handleToggle}
                    className='float-left my-3 w-8 h-8 peer' id="toggle"
                    type="checkbox"
                />
                <label
                    className='block text-left py-4 pl-16 pr-4 w-full text-2xl leading-none border peer-checked:text-gray-300 peer-checked:line-through'
                    onDoubleClick={handleDoubleClick}
                >{job.title}</label>
                <button onClick={handleDel} className='absolute right-4 top-4 group-hover:block hidden text-red-800'>X</button>
            </div>}
            {edit && <form onSubmit={handleSubmit}>
                <input
                    className="py-4 pl-16 pr-4 w-full text-2xl"
                    value={title}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlue}
                    autoFocus={true}
                />
            </form>}
        </>
    )
}

export default View;