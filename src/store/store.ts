import { configureStore } from '@reduxjs/toolkit'
import seedReducer from './store-slice'; 
const store =  configureStore({
  reducer: {
    seed: seedReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;