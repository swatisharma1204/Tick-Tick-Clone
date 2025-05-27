import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const titleBox = createSlice({
    name: "allDetails",
    initialState: {
        tasks: [],
        selectedTask: null,
        filterVal: 'INBOX',
    },
    reducers: {
        addTask: (state, action) => {
            const { title, deadline, priority, desc, status, _id } = action.payload;
            state.tasks.push({ _id, status, title, deadline, priority, desc });
        },
        updateTask: (state, action) => {
            console.log(action.payload, 'action.payload')
            const { _id,updatedTask } = action.payload;
            console.log(updatedTask)
            console.log(_id)
            const existingTask = state.tasks.find((task) => task._id === _id);
            if (existingTask) {
                Object.assign(existingTask, updatedTask);
            }

            const updateApiCall = async () => {
                const updatedTaskInDb = await axios.post(`http://localhost:5001/api/tasks/updateTask`, { _id, updatedTask })
            }
            updateApiCall()
        },
        deleteTask: (state, action) => {
            const _id = action.payload;
            state.tasks = state.tasks.filter((task) => task._id !== _id);

            const deleteApiCall = async () => {
                await axios.delete(`http://localhost:5001/api/tasks/${_id}`);
            };
            deleteApiCall();
        },



        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload;
        },
        setFilter: (state, action) => {
            state.filterVal = action.payload;
        }
    }

})

export const {
    addTask,
    updateTask,
    setSelectedTask,
    setFilter,
    deleteTask
} = titleBox.actions;

export default titleBox.reducer; 