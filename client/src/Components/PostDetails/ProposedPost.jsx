import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core/';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { ThemeProvider } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { ButtonBase } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { themeColor } from '../../App';
import { likePost } from '../../actions/posts';
import { baseURL } from '../../api';
import classes from './styles.module.css';
import JapanLogo from "./../../Images/JapanLogo.png";

const ProposedPost = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(post?.likes);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    };

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                    <><ThumbUpIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }
        return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => {
        navigate(`/posts/${post._id}`);
    };

    return (
        <Card className={classes.cardItem} raised elevation={6}>
            <ButtonBase
                component="span"
                name="test"
                className={classes.cardAction}
                onClick={() => openPost(post._id)}
            >
                <CardMedia className={classes.media} component="img" image={post.selectedFile ? post?.selectedFile : JapanLogo} title={post.title} />
                <Typography sx={{ position: 'absolute', top: '0', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', mixBlendMode: 'darken', height: '140px' }}></Typography>
                <div className={classes.overlay}>
                    <Typography variant="h6">{post?.creator.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div style={{ alignSelf: 'start' }}>
                    <Typography variant="body2" sx={{ padding: '5px 10px 0 16px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '160px' }} color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag}`)}</Typography>
                </div>
                <Typography style={{ padding: '0 16px', alignSelf: 'start', marginBottom: '0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '160px' }} gutterBottom variant="h5">{post.title}</Typography>
                <CardContent sx={{ alignSelf: 'start', padding: '10px 16px 0 16px' }} >
                <Typography variant="body2" component={'span'} style={{opacity: '0.7'}} dangerouslySetInnerHTML={{ __html: post.message.split(' ').splice(0, 8).join(' ')}}></Typography>
                </CardContent>
            </ButtonBase>
            <ThemeProvider theme={themeColor} >
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                        <Likes />
                    </Button>
                </CardActions>
            </ThemeProvider>
        </Card>
    );
};

export default ProposedPost;