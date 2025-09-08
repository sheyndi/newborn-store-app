import { createSlice, current } from "@reduxjs/toolkit"

const initUser = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    
}

const userSlice = createSlice({
    name: "user",
    initialState: initUser,

    reducers:{
        userIn: (state, action) =>{
            state.currentUser = action.payload
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        userOut: (state, action)=>{
            state.currentUser = null;
            localStorage.removeItem('currentUser');
        }
    }
})

export const {userIn, userOut} = userSlice.actions;
export default userSlice.reducer;