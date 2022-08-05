import { RootState } from '@/helpers/redux/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// declaring the types for our state
export type state = {
  page: number;
  limit: number;
};

const initialState: state = {
  page: 1,
  limit: 10,
};

export const slice = createSlice({
  name: 'categoryNews',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      // It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state" and produces a brand new immutable state based off those changes
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
})
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setPage, setLimit } = slice.actions

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectPage = (state: RootState) => state.categoryNews.page
export const selectLimit = (state: RootState) => state.categoryNews.limit

// exporting the reducer here, as we need to add this to the store
export default slice.reducer
