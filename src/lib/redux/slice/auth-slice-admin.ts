import { RootState } from '@/lib/redux/store';
import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

// declaring the types for our state
export type authState = {
    isLogin: boolean;
    token: string;
    expirated: number;
};

const initialState: authState = {
    isLogin: false,
    token: null,
    expirated: 0,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions. 
    // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app. 
    // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
    reducers: {
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. 
            // It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state" and produces a brand new immutable state based off those changes
            state.isLogin = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.expirated = action.payload ? new Date().getTime() : 0;
        },
    },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
    setIsLogin,
    setToken,
} = authSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectToken = (state: RootState) => state.auth.token;
export const selectExpirated = (state: RootState) => state.auth.expirated;

// exporting the reducer here, as we need to add this to the store
export default authSlice.reducer;