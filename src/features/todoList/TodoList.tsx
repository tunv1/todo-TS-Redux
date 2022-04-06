import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addJob,
    getJobs,
    toggleAllCompleted,
    selectTodo,
} from './TodoSlice'
import angledownsolid from './icons/angle-down-solid.svg'
import View from './View';
import Foot from './Foot';

export function ToDoList() {
    const dispatch = useDispatch()
    const { jobs, showing } = useSelector(selectTodo)
    const [title, setTitle] = useState('')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    useEffect(() => {
        dispatch(getJobs())
    }, [])

    useEffect(() => {
            localStorage.setItem('jobs', JSON.stringify(jobs))
    }, [jobs])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const uuid = require("uuid");
        const uId = uuid.v4()

        dispatch(addJob({ uId, title }));
        setTitle('')
    }

    const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllCompleted(event.target.checked))
    }

    const listTodo = jobs.filter(job => {
        switch (showing) {
            case 'Active': return !job.isCompleted
            case 'Complete': return job.isCompleted
            default: return true
        }
    })

    const listView = <div>
        {listTodo.map(job => (
            <View key={job.uId} job={job} />
        ))}
    </div>

    const itemleft = jobs.filter(job => !job.isCompleted).length

    return (
        <div className="block leading-6 bg-gray-100 font-light text-center w-screen h-screen [font-family:'Helvetica_Neue',Helvetica,Arial,sans-serif]">
            <h1
                className='py-5 text-[rgba(175,47,47,0.15)] text-9xl'
            >todos</h1>
            <div className='min-w-[240px] max-w-xl m-0 m-auto bg-white [box-shadow:0_2px_4px_0_rgb(0_0_0_/_20%),_0_25px_50px_0_rgb(0_0_0_/_10%)] relative'>
                <form className='w-full' onSubmit={handleSubmit} >
                    <input
                        checked={itemleft === 0}
                        onChange={handleToggleAll}
                        className='hidden peer'
                        id="toggleAll"
                        type="checkbox"
                    />
                    {jobs.length !== 0 && <label className="peer-checked:text-black text-gray-400 absolute top-4 left-4 text-3xl [transform:rotate(90deg)]" htmlFor="toggleAll">{">"}</label>}
                    <input
                        className="py-4 pl-16 pr-4 w-full text-2xl"
                        placeholder='What needs to be done?'
                        value={title}
                        onChange={handleChange}
                    />
                </form>
                {listView}
                <Foot itemleft={itemleft} />
            </div>
        </div>
    )
}