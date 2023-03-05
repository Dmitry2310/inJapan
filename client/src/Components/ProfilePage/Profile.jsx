import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Divider from '@mui/material/Divider';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import noAvatar from "./../../Images/noAvatar.png";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Grow from '@mui/material/Grow';
import { ThemeProvider } from "@material-ui/core";
import { themeColor } from '../../App';
import { getUser } from "./../../actions/users";
import { updateUser, updateAvatar } from "./../../actions/auth";
import AllPublishedPosts from "./AllPublishedPosts/AllPublishedPosts";
import Avatar from '@mui/material/Avatar';
import Social from './Social';
import RatingUsers from './../RatingUsers/RatingUsers';
import Paper from '@mui/material/Paper';
import { useLocation } from "react-router-dom";
import { baseURL } from './../../api/index';
import TextEditorProfile from './TextEditorProfile';
import { useTranslation } from "react-i18next";

const Profile = () => {

    const owner = JSON.parse(localStorage.getItem('profile'));
    const ownerId = owner?.result._id;
    const myProfile = useSelector((state) => state.auth.profile);
    const [user, setUser] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [changedUser, setChangetUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const someUser = useSelector((state) => state.users.someUser);
    const dispatch = useDispatch();
    const { id } = useParams();
    const location = useLocation();
    const { t } = useTranslation();

    //SET new user ----------------------
    useEffect(() => {
        if (id === ownerId) {
            setUser(myProfile);
        } else {
            setIsEdit(false);
            dispatch(getUser(id));
        }
    }, [id, myProfile, dispatch, ownerId]);

    useEffect(() => {
        setUser(someUser);
    }, [someUser]);

    useEffect(() => {
        setUser(null);
        setIsLoading(true);
    }, [location]);

    useEffect(() => {
        if (user) {
            setIsLoading(false);
        }
    }, [user]);

    //END SET new user ----------------------

    const editProfile = () => {
        setChangetUser(myProfile);
        setIsEdit(true);
    };

    const saveData = () => {
        setIsEdit(false);
        setUser(changedUser);
        if (selectedImage) {
            dispatch(updateAvatar(selectedImage));
        };
        dispatch(updateUser(id, changedUser));
        setSelectedImage('');
    };

    const cancel = () => {
        setIsEdit(false);
        setUser(myProfile);
        setSelectedImage('');
    };

    //Upload user photo -------------
    const [selectedImage, setSelectedImage] = useState('');
    const hiddenFileInput = React.useRef(null);

    const handleAvatarChange = (e) => {
        if (e.target.files.length !== 0) {
            setSelectedImage(e.target.files[0]);
        } else {
            return;
        }
    };
    const handleClick = () => {
        hiddenFileInput.current.click();
    };
    // END Upload user photo -------------

    return (
        <Grow in>
            < Container maxWidth="xl" sx={{ marginTop: '20px', boxSizing: 'border-box', paddingLeft: '0' }}  >
                <ThemeProvider theme={themeColor}>
                    <Grid container spacing={2} >
                        <Grid item lg={3} xs={12} sx={{ flexDirection: 'column' }}>
                            <Paper sx={{ padding: '20px', margin: '15px 0' }} elevation={6}>
                                < Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={() => navigate('/posts/create')}>{t("Create_Article")}</Button>
                            </Paper>
                            <RatingUsers />
                        </Grid>
                        {isLoading
                            ?
                            <Grid item lg={9} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '600px' }}>
                                <CircularProgress size="5em" />
                            </Grid>
                            :
                            <Grid item lg={9}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', paddingTop: '20px', position: 'relative' }}>
                                            <Box>
                                                {(isEdit)
                                                    ?
                                                    <Avatar alt={user?.name} src={selectedImage !== "" ? URL.createObjectURL(selectedImage) : `${baseURL}/${changedUser?.avatar}` || noAvatar} style={{ borderRadius: '500px', width: '150px', height: '150px', border: '5px solid white', objectFit: 'contain' }}></Avatar>
                                                    :
                                                    <Avatar alt={user?.name} src={user?.avatar ? `${baseURL}/${user?.avatar}` : noAvatar} sx={{ borderRadius: '500px', width: { xs: '200px', sm: '250px' }, height: { xs: '200px', sm: '250px' }, border: '5px solid white', objectFit: 'contain', margin: '0 auto' }}></Avatar>
                                                }
                                            </Box>
                                            <>
                                                {isEdit
                                                    ?
                                                    <Box sx={{ position: 'absolute', top: '0', right: '0', display: { xs: 'flex' }, width: { xs: '100%' }, justifyContent: { xs: 'space-between', md: 'flex-end' } }}>
                                                        {
                                                            <>
                                                                <Button variant="contained" onClick={saveData}>{t("Save")}</Button>
                                                                <Button variant="contained" onClick={cancel} color='secondary' sx={{ marginLeft: '20px' }}>{t("Cancel")}</Button>
                                                            </>
                                                        }
                                                    </Box>
                                                    :
                                                    <Box sx={{ position: 'absolute', top: '40px', right: { xs: '0', sm: '40px', md: '100px' } }}>
                                                        {
                                                            ((owner?.result._id === user?._id) || (owner?.result.isAdmin === true)) && <Button variant="contained" onClick={editProfile}>{t("Edit")}</Button>
                                                        }
                                                    </Box>
                                                }
                                            </>
                                        </Box>
                                        {isEdit
                                            &&
                                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                                                <input type='file' style={{ display: 'none' }} onChange={handleAvatarChange} ref={hiddenFileInput}></input>
                                                <Button variant='contained' onClick={handleClick}>{t("Change_Avatar")}</Button>
                                            </Box>
                                        }
                                    </Grid>
                                    <Grid item xs={12} marginTop="35px">
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Typography gutterBottom variant='h5' sx={{ margin: '5px auto'}}>
                                                {user?.name}
                                            </Typography>
                                            {(owner?.result.isAdmin === true) && <Typography sx={{ margin: '5px auto'}}>ID:{user?._id}</Typography>}
                                            <Typography component="legend" sx={{ opacity: '0.6', margin: '0 auto' }}>{t("Rating")}</Typography>
                                            <Rating name="half-rating" value={user?.likesCounter ? (user?.likesCounter / 10) : 0} precision={0.1} readOnly sx={{ margin: '0 auto' }} />
                                            {isEdit
                                                &&
                                                <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                                                    <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', opacity: '0.7', fontSize: {xs: '12px', md: '16px'}, textAlign: 'center' }}>{t("Your_Rating_depends_on_the_number_of_likes_under_your_articles")}</Typography>
                                                </Box>}
                                            {isEdit
                                                ?
                                                <TextEditorProfile changedUser={changedUser} setChangetUser={setChangetUser} />
                                                :
                                                <Box sx={{ padding: { xs: '15px', sm: '35px', md: '35px 45px' } }}>
                                                    <div dangerouslySetInnerHTML={{ __html: user?.desc }}></div>
                                                </Box>
                                            }
                                            <Social user={user} isEdit={isEdit} setChangetUser={setChangetUser} changedUser={changedUser} />
                                            <Divider variant="middle" sx={{ marginBottom: '10px' }} />
                                            <Typography gutterBottom variant='h6' sx={{ padding: '15px' }}>
                                                {owner?.result._id === user?._id ? `${t("All_my_Articles")}` : `${t("Published_Articles")}`}
                                            </Typography>
                                            <Divider variant="middle" sx={{ marginBottom: '20px' }} />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="stretch" spacing={2} sx={{ marginBottom: '40px' }}>
                                    < AllPublishedPosts id={id} />
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </ThemeProvider>
            </Container>
        </Grow>
    )
};

export default Profile;
