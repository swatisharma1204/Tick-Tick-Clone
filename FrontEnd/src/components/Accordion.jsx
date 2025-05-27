import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setSelectedTask, updateTask, deleteTask } from '../utils/notesSlice';
import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



export default function AccordionUsage({ tasksArray = [], isCompleted = false }) {
  const dispatch = useDispatch();
  const [selectedTaskId, setSelectedTaskId] = useState(null);

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

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleTaskClick = (item) => {
    setSelectedTaskId(item._id);
    dispatch(setSelectedTask(item));
  };


  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div>
      <Accordion defaultExpanded={!isCompleted}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <h3>{isCompleted ? 'Completed' : 'Pending'}</h3>
        </AccordionSummary>
        <AccordionDetails>
          {tasksArray.length > 0 ? (
            tasksArray.map((item) => (
              <li className={`list-item ${selectedTaskId === item._id ? 'selected' : ''}`}
              key={item._id} onClick={() => handleTaskClick(item)}>
                <Checkbox
                  {...label}
                  className='checkbox'
                  checked={item.status}
                  onChange={() => dispatch(updateTask({ _id: item._id, updatedTask: { status: !item.status } }))}
                  sx={getCheckboxStyle(item.priority)}
                />
                <input
                  className='input-box title-box'
                  type='text'
                  value={item.title}
                  onChange={(e) => dispatch(updateTask({ _id: item._id, updatedTask: { title: e.target.value } }))}
                />

                {dayjs(item.deadline).isBefore(dayjs(), 'day') ? (
                  dayjs(item.deadline).isSame(dayjs().subtract(1, 'day'), 'day') ? (
                    <span style={{ color: 'red' }}>Yesterday</span>
                  ) : (
                    <span style={{ color: 'red' }}>{dayjs(item.deadline).format('DD MMMM')}</span>
                  )
                ) : dayjs(item.deadline).isSame(dayjs(), 'day') && dayjs(item.deadline).format('HH:mm') === '23:59' ? (
                  <span>Today</span>
                ) : dayjs(item.deadline).isSame(dayjs(), 'day') ? (
                  dayjs(item.deadline).isSame(dayjs().startOf('day')) ? (
                    <span>Today</span>
                  ) : (
                    <span>{dayjs(item.deadline).format('HH:mm')}</span>
                  )
                ) : dayjs(item.deadline).isSame(dayjs().add(1, 'day'), 'day') ? (
                  <span>Tomorrow</span>
                ) : (
                  <span>{dayjs(item.deadline).format('DD MMMM')}</span>
                )}

                {<span className='span-pr'>
                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="small" onClick={() => handleDeleteTask(item._id)} />
                  </IconButton>
                </span>}
                <hr className='hor-row'></hr>
              </li>
            ))
          ) : (
            <li className='list'>No tasks!</li>
          )}
        </AccordionDetails>
      </Accordion>
    </div >
  );
}
