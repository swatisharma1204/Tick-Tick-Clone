import React, { useState, useEffect } from 'react';
import './component-css/middle.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, setSelectedTask } from '../utils/notesSlice';
import BasicDateTimePicker from './DateTimePicker';
import BasicPrioritySelect from './PriorityMenu';
import dayjs from 'dayjs';
import MenuIcon from '@mui/icons-material/Menu';
import AccordionUsage from './Accordion';
import axios from 'axios';

function Middle() {
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState(dayjs().endOf('day'));
  const [priority, setPriority] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  const allTaskDetails = useSelector((state) => state.allDetails.tasks);
  const filterValue = useSelector((state) => state.allDetails.filterVal);

  const dispatch = useDispatch();

  console.log("Filter is: ", filterValue);
  console.log("All Task Details: ", allTaskDetails);

  useEffect(async () => {
    const tasksDataFromDb = await axios
      .get('http://localhost:5001/api/tasks')
    console.log(tasksDataFromDb.data)


    if (tasksDataFromDb) {
      tasksDataFromDb.data.map(task => {
        let { title, deadline, priority, desc, _id, status } = task
        deadline = dayjs(deadline);
        dispatch(addTask({ title, deadline, priority, desc, _id, status }));
      })
    }
  }, [])

  const filteredTasks = allTaskDetails.filter((task) => {
    if (filterValue === 'TODAY') {
      return dayjs(task.deadline).isSame(dayjs(), 'day');
    } else if (filterValue === 'NEXT_7_DAYS') {
      return dayjs(task.deadline).isBefore(dayjs().add(7, 'day')) && dayjs(task.deadline).isAfter(dayjs());
    } else {
      return true;
    }
  });

  const pendingTasks = filteredTasks.filter((task) => !task.status);
  const completedTasks = filteredTasks.filter((task) => task.status);

  console.log("Filtered Tasks: ", filteredTasks);

  const handleAddTitle = async () => {
    if (title.trim()) {
      const res = await axios.post('http://localhost:5001/api/tasks', { title, deadline: dateTime, priority, desc: taskDesc, status: false })
      dispatch(addTask({ _id: res.data.insertedId, title, deadline: dateTime, priority, desc: taskDesc }));
      console.log(typeof (dateTime), dateTime);
      setTitle('');
      setDateTime(dayjs().endOf('day'));
      setPriority('');
      setTaskDesc('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTitle();
    }
  };

  const handleCloseLeftbar = () => {
    // Complete it
  };

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div className='middle-box'>
      <div className='input-wrapper'>
        <div className='close-leftbar' onClick={handleCloseLeftbar}>
          <MenuIcon />
          <p className='inbox-text'>
            {filterValue === 'TODAY' ? 'Today' : filterValue === 'NEXT_7_DAYS' ? 'Next 7 Days' : 'Inbox'}
          </p>
        </div>

        <div className='title-bar'>
          <div className='input-container'>
            <input
              className='text-box input-box'
              type="text"
              value={title}
              placeholder='+ Add task to "Inbox'
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <BasicDateTimePicker
              className='buttonDateTime'
              value={dateTime}
              onChange={(newValue) => setDateTime(newValue)}
            />
            <BasicPrioritySelect
              className='buttonPriority'
              value={priority}
              onChange={(newPriority) => setPriority(newPriority)}
            />
          </div>
        </div>
      </div>

      <div className='task-list'>
        <AccordionUsage tasksArray={pendingTasks} isCompleted={false} />
        <AccordionUsage tasksArray={completedTasks} isCompleted={true} />
      </div>
    </div>
  );
}

export default Middle;

