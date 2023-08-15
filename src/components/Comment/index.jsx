import PropTypes from "prop-types"
import moment from 'moment'

import { ListItem, ListItemAvatar, Paper } from '@mui/material';
import { Avatar, Typography, } from '@mui/material';
import './style.scss'
import { Link } from "react-router-dom";


function Comment({ author,text,createdAt}) {

    //Date and time reformatting
    const date = moment(createdAt).format('DD/MM/YYYY');
    const time = moment(createdAt).format('HH[h]mm')
   
    return (
        <ListItem className="c-comment-list" alignItems="flex-start">
            <ListItemAvatar>
                <Link to={`/${author.organizationId}/user/${author.id}`}>
                    <Avatar alt="Remy Sharp" src={author.profilePicture} />
                </Link>
            </ListItemAvatar>
            <Paper className="c-comment-list__paper" >
                <Typography variant="body2">
                    <Link to={`/${author.organizationId}/user/${author.id}`}>{`${author.name} ${author.surname}`}</Link> - {date} à {time} 
                </Typography>              
                <Typography variant="body2">
                    {author.job}
                </Typography>
                <Typography className="c-comment-list__text" variant="body1" mt={2}>
                    {text}
                </Typography>
            </Paper>
        </ListItem>
    )
}

Comment.propTypes = {
    author: PropTypes.object,
    text: PropTypes.string,
    createdAt: PropTypes.string,   
};

export default Comment