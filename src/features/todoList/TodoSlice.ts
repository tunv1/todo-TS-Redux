import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../../app/store";

export interface todoInit {
    uId: string,
    title: string,
    isCompleted: boolean
}

export interface todoState {
    jobs: todoInit[],
    showing: string
}

const initialState: todoState = {
    jobs: [],
    showing: "All"
};

export const getJobs = createAsyncThunk(
    'todo/getJobs',
    async () => {
        const storageJobs = await new Promise<{ data: todoInit[] }>(resolve =>
            resolve({ data: JSON.parse(localStorage.getItem('jobs')!) })
        )
        return storageJobs.data;
    }
)

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addJob(state, action: PayloadAction<{ uId: string, title: string }>) {
            return {
                ...state,
                jobs: [...state.jobs,
                {
                    uId: action.payload.uId,
                    title: action.payload.title,
                    isCompleted: false
                }]
            }
        },
        editJob: (state, action: PayloadAction<{ uId: string, title: string }>) => {
            return {
                ...state,
                jobs: state.jobs.map(job => {
                    if (action.payload.uId === job.uId) {
                        return {
                            ...job,
                            title: action.payload.title
                        }
                    }
                    return job
                })
            }
        },
        removeJob: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                jobs: state.jobs.filter(job => job.uId !== action.payload)
            }
        },
        removeCompleted: (state) => {
            return {
                ...state,
                jobs: state.jobs.filter(job => !job.isCompleted)
            }
        },
        toggleCompleted: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                jobs: state.jobs.map(job => {
                    if (job.uId === action.payload) {
                        return {
                            ...job,
                            isCompleted: !job.isCompleted
                        }
                    }
                    return job
                })
            }
        },
        toggleAllCompleted: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                jobs: state.jobs.map(job => {
                    return {
                        ...job,
                        isCompleted: action.payload
                    }
                })
            }
        },
        changeShow: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                showing: action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getJobs.pending, () => {
                console.log('data is pending...')
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                console.log('data is fulfilled');
                
                return {
                    ...state,
                    jobs: action.payload
                }
            })
    }
})

export const { addJob, editJob, removeCompleted, removeJob, toggleAllCompleted, toggleCompleted, changeShow } = todoSlice.actions


export const selectTodo = (state: ReturnType<typeof store.getState>) => state.todo

export default todoSlice.reducer