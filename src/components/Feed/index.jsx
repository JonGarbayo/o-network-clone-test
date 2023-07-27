import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../redux/selectors/user'
import { getPosts } from '../../redux/selectors/feed'
import { fetchPosts } from '../../redux/thunks/feed';

import { Box, Avatar, Grid } from '@mui/material'
import {  Typography } from '@mui/material'

import PostForm from '../Forms/PostForm';
import Post from '../Post'
import './style.scss'

function Feed() {

    // Recovery of logged-in user data
    const userLogged = useSelector(getUser);
    
    
    // Recovery all posts    
    const posts = useSelector(getPosts);

    const dispatch = useDispatch();
    
    useEffect(()=>{        
        dispatch(fetchPosts());
    }, [])

    return (
        <Box className="c-feed" >
            <Box className="c-feed-header">
                <Typography variant="h5" >
                    {"Nom de l'organisation"}
                </Typography>
                <Box className="c-feed-header__textarea" >
                    <Avatar 
                        className="c-avatar" 
                        alt="Remy Sharp" 
                        src={userLogged.profilePicture} 
                    />
                    <PostForm
                        
                    />
                </Box>
            </Box>
            {posts.map(post => (   
                <Grid key={post.id}>
                    <Post {...post}/>
                </Grid>
            ))} 
        </Box>
    )
}

export default Feed