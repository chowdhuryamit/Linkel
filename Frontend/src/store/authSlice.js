import {createSlice} from "@reduxjs/toolkit"

const initialState={
    status:false,
    userData:null,
    userPosts:[],
    savedPosts:[],
}

const authSlice=createSlice({
    name:"authStatus",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true,
            state.userData=action.payload.userData
        },
        logout:(state,action)=>{
            state.status=false,
            state.userData=null
        },
        addPosts:(state,action)=>{
            const newPost = action.payload.post;
            const exists = state.userPosts.some(post=>post._id===newPost._id);
            if(!exists){
                state.userPosts.push(newPost);
            }
        },
        addSavedPosts:(state,action)=>{
            const newPost = action.payload.post;
            const exists = state.savedPosts.some(post=>post._id===newPost._id);
            if(!exists){
                state.savedPosts.push(newPost);
            }
        }
    }
})

export const {login,logout,addPosts,addSavedPosts}=authSlice.actions;
export default authSlice.reducer;
