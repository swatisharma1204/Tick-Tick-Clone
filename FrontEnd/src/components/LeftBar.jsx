import React, { useState } from 'react';
import './component-css/leftbar.css';
import { useDispatch } from 'react-redux';
import { setFilter } from '../utils/notesSlice';

const LeftBar = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState('inbox'); // Initialize with 'inbox'

  const handleButtonClick = (filter, buttonId) => {
    dispatch(setFilter(filter));
    setActiveButton(buttonId);
  };

  return (
    <div className='left-bar'>
      <h2>TickTick Clone</h2>
      <div className='nav-buttons'>
        <button
          id='today'
          className={`btn ${activeButton === 'today' ? 'active' : ''}`}
          onClick={() => handleButtonClick('TODAY', 'today')}
        >
          Today
        </button>
        <button
          id='next7days'
          className={`btn ${activeButton === 'next7days' ? 'active' : ''}`}
          onClick={() => handleButtonClick('NEXT_7_DAYS', 'next7days')}
        >
          Next 7 Days
        </button>
        <button
          id='inbox'
          className={`btn ${activeButton === 'inbox' ? 'active' : ''}`}
          onClick={() => handleButtonClick('INBOX', 'inbox')}
        >
          Inbox
        </button>
      </div>
      <div className='line'></div>
    </div>
  );
};

export default LeftBar;
