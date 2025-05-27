import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTask } from '../utils/notesSlice';
import Checkbox from '@mui/material/Checkbox';
import BasicDateTimePicker from './DateTimePicker';
import BasicPrioritySelect from './PriorityMenu';
import './component-css/rightbar.css'


const RightBar = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.allDetails.selectedTask);
  const allTasks = useSelector((state) => state.allDetails.tasks);

  if (!selectedTask || allTasks.length === 0) {
    return null;
  }

  const task = allTasks.find(task => task._id === selectedTask._id)

  if (!task) {
    return <div className='right-bar-if'></div>;
  }
  const getCheckboxStyle = (priority) => {
    switch (priority) {
      case '🔴':
        return { color: '#E13E38', '&.Mui-checked': { color: '#E13E38' } };
      case '🟡':
        return { color: '#FAA80B', '&.Mui-checked': { color: '#FAA80B' } };
      case '🔵':
        return { color: '#4772F9', '&.Mui-checked': { color: '#4772F9' } };
      default:
        return { color: '#979797', '&.Mui-checked': { color: '#707070' } };
    }
  };

  const handleUpdateTask = (updates) => {
    dispatch(updateTask({ _id: selectedTask._id, updatedTask: {...updates }}))
  };

  // if (!selectedTask) {
  //   return <div className='right-bar-if'></div>
  // }
  return (
    <div className='right-bar'>
      <div className='top-controls'>
        <Checkbox
          checked={task.status}
          onChange={() => handleUpdateTask({ status: !task.status })}
          sx={getCheckboxStyle(task.priority)}
        />
        <BasicDateTimePicker
          value={task.deadline}
          onChange={(newValue) => handleUpdateTask({ deadline: newValue })}
        />
        <BasicPrioritySelect
          value={task.priority}
          onChange={(newPriority)=>handleUpdateTask({ priority: newPriority })}
        />
      </div>

      <div className='text-boxes'>
        <div class="input-container">
          <input
            className='rightbar-title'
            placeholder='Write the Task title here'
            type='text'
            value={task.title}
            onChange={(e) => handleUpdateTask({ title: e.target.value })}
          />
        </div>
        <div className="parent-container">
          <textarea
            name="text"
            className='rightbar-desc'
            placeholder='Write the description here...'
            value={task.desc}
            onChange={(e) => handleUpdateTask({ desc: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default RightBar;