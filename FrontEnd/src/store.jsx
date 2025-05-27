import {configureStore} from '@reduxjs/toolkit'
import titleReducer from './utils/notesSlice'
// import dateTimeReducer from './utils/dateTimeSlice'

const store=configureStore({
    reducer:{
        allDetails:titleReducer,
        // deadline:dateTimeReducer,
    }
});

export default store;