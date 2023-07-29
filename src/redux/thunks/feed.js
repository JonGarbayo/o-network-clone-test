import { createAsyncThunk } from '@reduxjs/toolkit'
import posts from "../../data/Post.js"
import comments from "../../data/Comment.js"
import moment from 'moment'

export const fetchPosts = createAsyncThunk("feed/fetchPosts", async () => {
    try {

        return posts;

    }
    catch (error) {
        throw new Error( "Une erreur s'est produite");
    }
})

export const fetchComments = createAsyncThunk("feed/fetchComments", async (postId) => {
    try {
        const postComments =
            comments.filter((comment) => comment.post_id === postId);

        return {postComments, postId}

    }
    catch (error) {
        throw new Error( "Une erreur s'est produite");
    }
})

export const addNewPost = createAsyncThunk("feed/addNewPost", async (text, thunkApi) => {
    try {

        // fetch of logged-in user data
        const userLogged = thunkApi.getState().user

        const posts = thunkApi.getState().feed.posts
        
        const lastIndex = posts.length - 1;
        const lastId = posts[lastIndex].id;
        const newId = lastId + 1
        
        const now = moment() ;

        const date = now.format('YYYY-MM-DD');
        const time = now.format('HH:mm:ss');
        const formattedDate = `${date} ${time}`

        const newPost = {
            id: newId,
            text: text,
            reactions:[],
            commentsCount: 0,
            author: {
                id: userLogged.id,
                email: userLogged.email,
                name: userLogged.name,
                surname: userLogged.surname,
                job: userLogged.job,
                role: {
                    tag: userLogged.role.tag,
                    name: userLogged.role.name,
                },
                profilePicture: userLogged.profilePicture,
                disabled: userLogged.disabled,
            },
            createdAt: formattedDate
        };
        
        return newPost;

    }
    catch (error) {
        throw new Error( "Une erreur s'est produite");
    }
})

export const addReaction = createAsyncThunk("post/addReaction", async ({postId, reaction}, thunkApi) => {
    
    
    try {
        const posts = thunkApi.getState().feed.posts
        const exist = posts.some(({id}) => id ===postId)  
        
        if (!exist) {
            return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        } 

        const  newReaction = {
            
            author:{
                id: 2,
                name: 'Roro',
                surname: 'Roro',
                job: 'Pilot',
                profilePicture: 'https://randomuser.me/api/portraits/men/36.jpg',
            },
            type:{
                tag: `${reaction}`,
                name: `${reaction}`,
            },
        };
       
        return {newReaction, postId}
        
    }
    catch (error) {
        return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de l'ajout de la reaction" });  
    }
})



export const updateReaction = createAsyncThunk("post/updateReaction", async ({postId, reaction}, thunkApi) => {

    try {const posts = thunkApi.getState().feed.posts
        const exist = posts.some(({id}) => id ===postId)  
        
        if (!exist) {
            return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        } 

        const  updatedReaction = {
            
            author:{
                id: 2,
                name: 'Roro',
                surname: 'Roro',
                job: 'Pilot',
                profilePicture: 'https://randomuser.me/api/portraits/women/68.jpg',
            },
            type:{
                tag: `${reaction}`,
                name: `${reaction}`,
            },
        };
       
        return {updatedReaction, postId}
        
    }
    catch (error) {
        return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de l'ajout de la reaction" });  
    }
})


export const removeReaction = createAsyncThunk("post/removeReaction", async ({postId, reaction}, thunkApi) => {

    try {const posts = thunkApi.getState().feed.posts
        const exist = posts.some(({id}) => id ===postId)  
        
        if (!exist) {
            return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        } 

        const  removedReaction = {
            
            author:{
                id: 2,
                name: 'Roro',
                surname: 'Roro',
                job: 'Pilot',
                profilePicture: 'https://randomuser.me/api/portraits/men/36.jpg',
            },
            type:{
                tag: `${reaction}`,
                name: `${reaction}`,
            },
        };
       
        return {removedReaction, postId}
        
    }
    catch (error) {
        return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de l'ajout de la reaction" });  
    }
})

