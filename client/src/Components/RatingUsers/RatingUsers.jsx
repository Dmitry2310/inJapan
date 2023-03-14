import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Divider, Typography } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { getUsers } from "../../actions/users";
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import noAvatar from "./../../Images/noAvatar.png";
import Rating from '@mui/material/Rating';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { getAuthorBySearch } from './../../actions/users';
import { clearAuthors } from './../../actions/users';
import { clearNotification } from './../../actions/users';
import { Button } from "@mui/material";
import { baseURL } from "../../api";
import { useTranslation } from "react-i18next";

const RatingUsers = () => {

    const ratingUsers = useSelector((state) => state.users.users);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authors = useSelector((state) => state.users.authors)
    const notification = useSelector((state) => state.users.message);
    const isSearching = useSelector((state) => state.users.isSearching);
    const { t } = useTranslation();

    //Search author ------------
    const [isSearch, setIsSearch] = useState(false);
    const [searchData, setSearchData] = useState('');

    const closeSearching = () => {
        setIsSearch(false);
        setSearchData('');
        dispatch(clearAuthors());
        dispatch(clearNotification());
    };

    const searchAuthor = () => {
        if (searchData.trim()) {
            dispatch(getAuthorBySearch({ searchData }));
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchAuthor();
        }
    };
    //END Search author ---------

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    useEffect(() => {
        if (authors.length) {
            setUsers(authors);
            return;
        }
        setUsers(ratingUsers);
    }, [authors, ratingUsers]);

    return (
        <>
            <Paper elevation={6} sx={{ minHeight: '335px', padding: '0 10px 10px 10px', display: 'flex', flexDirection: 'column', maxHeight: '385px', marginTop: '10px' }}>
                <Box sx={{ display: 'flex', padding: '5px', alignItems: 'center', justifyContent: 'space-between' }}>
                    {isSearch
                        ?
                        <>
                            <TextField onKeyDown={handleKeyPress} sx={{ display: 'flex', marginRight: '5px' }} name="Author" size="small" variant="outlined" label={t("Find_Author")} color="primary" fullWidth value={searchData} onChange={(e) => setSearchData(e.target.value)} />
                            <Button variant="contained" size="small" onClick={closeSearching} color='secondary' sx={{ maxHeight: '35px' }}>
                                <Typography sx={{ padding: '5px' }}>{t("Close")}</Typography>
                            </Button>
                        </>
                        :
                        <>
                            <Button variant="contained" size="small" onClick={() => setIsSearch(true)} sx={{ maxHeight: '35px' }}>
                                <SearchIcon />
                            </Button>
                            <Typography sx={{ padding: '8px', fontWeight: '500', textAlign: 'center', fontSize: '14px' }}>{t("Best_Authors")}</Typography>
                            <Button variant="contained" size="small" onClick={closeSearching} color='secondary' sx={{ maxHeight: '35px' }}>
                                {t("Clear")}
                            </Button>
                        </>}
                </Box>
                <Divider sx={{ marginBottom: '10px' }}></Divider>
                {isSearching
                    ?
                    <Box sx={{ display: 'flex', minHeight: '200px', width: '100%', justifyContent: 'center', alignItems: 'center', opacity: '0.9' }}><CircularProgress size="3em" /></Box>
                    :
                    <>
                        {notification !== ' '
                            ?
                            <Box sx={{ display: 'flex', minHeight: '200px', width: '100%', justifyContent: 'center', alignItems: 'center', opacity: '0.7' }}>{notification}</Box>
                            :
                            <>
                                {users
                                    ?
                                    <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                                        {
                                            users?.map((item) => (
                                                <Box style={{ marginBottom: '7px', display: 'flex', cursor: 'pointer' }} key={item.name} onClick={() => navigate(`/user/${item._id}`)}>
                                                    <Avatar alt={item?.name} src={item?.avatar ? `${baseURL}/${item?.avatar}` : noAvatar} style={{ borderRadius: '50px', width: '50px', height: '50px', objectFit: 'contain' }}></Avatar>
                                                    <Box style={{ display: 'flex', flexDirection: 'column', paddingLeft: '20px' }}>
                                                        <Typography>{item?.name}</Typography>
                                                        <Rating name="half-rating" size="small" value={item?.likesCounter ? (item?.likesCounter / 10) : 0} precision={0.1} readOnly sx={{ margin: '0 auto' }} />
                                                    </Box>
                                                </Box>
                                            ))
                                        }
                                    </div >
                                    :
                                    <Box sx={{ display: 'flex', minHeight: '200px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                        < CircularProgress size="5em" />
                                    </Box>
                                }
                            </>
                        }
                    </>
                }
            </Paper>
        </>
    )
};

export default RatingUsers;