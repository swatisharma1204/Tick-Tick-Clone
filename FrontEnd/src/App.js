import './App.css';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
// import { useEffect } from 'react';
import Middle from './components/Middle';
// import { useDispatch } from 'react-redux';
// import { fetchTasks } from './utils/notesSlice';



function App() {

  return (
    <div className="App">
      <div className='leftBar'><LeftBar/></div>
      <div className='middle'><Middle/></div>
      <div className='rightBar'><RightBar/></div>
    </div>
  );
}

export default App;
