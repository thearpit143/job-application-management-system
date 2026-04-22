import { configureStore } from '@reduxjs/toolkit'
import candidateReducer from './candidateSlice';
import hrReducer from "./hrSlice";
import fetchStatusReducer from './fetchStatusSlice';

const hrDashboardStore = configureStore({
  reducer: {
    candidates: candidateReducer,
    hr: hrReducer,
    fetchStatus: fetchStatusReducer,
  }
});

export default hrDashboardStore;