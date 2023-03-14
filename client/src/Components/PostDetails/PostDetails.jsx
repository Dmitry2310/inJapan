import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ThemeProvider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import classes from './styles.module.css';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import { themeColor } from '../../App';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import noAvatar from "./../../Images/noAvatar.png";
import JapanLogo from "./../../Images/JapanLogo.png";
import { Box } from "@mui/system";
import ReactPlayer from 'react-player';
import { baseURL } from '../../api';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { deletePost, likePost } from '../../actions/posts';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalWindow from "./ModalWindow";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RecomendetPosts from './RecomendetPosts';
import ChangePost from './ChangePost';
import { useTranslation } from "react-i18next";

const PostDetails = () => {

    const { post, posts, isLoading, isFetching } = useSelector((state) => state.posts);
    const [isChanging, setIsChanging] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const user = JSON.parse(localStorage.getItem('profile'));

    //Open MODAL WINDOW
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //END Open MODAL WINDOW

    // Like the Post
    const hasLikedPost = post?.likes?.find((like) => like === user?.result._id);
    const [likes, setLikes] = useState(post?.likes);

    useEffect(() => {
        if (post?.likes) {
            setLikes(post?.likes)
        }
    }, [post]);

    const handleLike = async () => {
        dispatch(likePost(post?._id));

        if (hasLikedPost) {
            setLikes(post?.likes?.filter((id) => id !== user?.result._id));
        } else {
            setLikes([...post.likes, user?.result._id]);
        }
    };

    const Likes = () => {
        if (likes?.length > 0) {
            return likes.find((like) => like === user?.result._id)
                ? (
                    <><ThumbUpIcon fontSize="small" />&nbsp;{likes.length > 2 ? ` ${likes.length - 1} ` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }
        return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
    };
    //END Like the Post

    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post, dispatch]);

    const deleteThisPost = (postId) => {
        navigate('/posts');
        dispatch(deletePost(postId));
    };

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <ThemeProvider theme={themeColor}>
                    <CircularProgress size="7em" />
                </ThemeProvider>
            </Paper>
        );
    };

    if (isChanging) {
        return (
            <ChangePost post={post} setIsChanging={setIsChanging} />
        );
    };

    if (!post) return null;

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px', marginTop: '30px' }} elevation={6}>
            <ThemeProvider theme={themeColor} >
                <ModalWindow handleOpen={handleOpen} handleClose={handleClose} open={open} postId={post?._id} deleteThisPost={deleteThisPost} />
                <Grid container gap={2} sx={{ justifyContent: 'space-between', display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
                    <Grid item xs={12} sm={6} sx={{}}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h3" >{post?.title}</Typography>
                            {((user?.result?._id === post?.creatorId) || (user?.result?.isAdmin === true))
                                &&
                                <Box sx={{ display: 'flex', gap: '10px' }}>
                                    <Button size="small" variant='contained' color="primary" sx={{ maxHeight: '31px' }} onClick={() => setIsChanging(true)}>
                                        {t("Edit")}
                                    </Button>
                                    <Button size="small" variant='contained' sx={{ maxHeight: '31px' }} color="secondary" onClick={handleOpen}>
                                        <DeleteIcon fontSize="small" />  {t("Delete")}
                                    </Button>
                                </Box>
                            }
                        </Box>
                        <Typography gutterBottom variant="h6" color="textSecondary" >{post?.tags.map((tag) => `#${tag}`)}</Typography>
                        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate(`/user/${post?.creatorId}`)}>{t("Created_by")}  <Avatar alt={post?.creator.name} src={post?.creator.avatar ? `${baseURL}/${post?.creator.avatar}` : noAvatar} style={{ borderRadius: '25px', width: '25px', height: '25px', objectFit: 'contain', margin: '0 10px 0 10px' }}></Avatar> {post?.creator.name}</Typography>
                        <Typography variant="body1" component={'span'} sx={{ opacity: '0.7' }}>{moment(post?.createdAt).fromNow()}</Typography>
                        {(user?.result?.isAdmin === true) && <Typography variant="body1">ID:{post?._id}</Typography>}

                        <Divider style={{ margin: '20px 0' }} />
                        <Box>
                            <Typography variant="body1" component={'span'} sx={{ opacity: '0.9', display: 'flex' }} dangerouslySetInnerHTML={{ __html: post?.message }}></Typography>
                            {user?.result?._id !== post?.creatorId
                                &&
                                <Button size="large" color="primary" sx={{ border: '1px solid', display: 'flex' }} disabled={!user?.result} onClick={handleLike}>
                                    <Likes />
                                </Button>
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={5} >
                        <Grid container gap={2}>
                            <Grid item xs={12}>
                                <Card className={classes.card} raised elevation={6}>
                                    <CardMedia sx={{ height: '100%' }} component="img" image={post?.selectedFile ? `${baseURL}/${post?.selectedFile}` : JapanLogo} />
                                </Card>
                            </Grid>
                            {post?.selectedVideo
                                ?
                                <Grid item xs={12}>
                                    <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                                        <ReactPlayer
                                            style={{ position: 'absolute', top: '0', left: '0' }}
                                            url={post?.selectedVideo}
                                            width='100%'
                                            height='100%'
                                        />
                                    </Box>
                                </Grid>
                                :
                                null
                            }
                        </Grid>
                    </Grid>
                </Grid>
                {isFetching
                    ?
                    null
                    :
                    <RecomendetPosts posts={posts} post={post} />
                }
                <Divider style={{ margin: '20px 0' }} />
                <CommentSection post={post} />
            </ThemeProvider>
        </Paper>
    )
};

export default PostDetails;

