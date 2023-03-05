import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getPosts } from '../../actions/posts';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Paginate from '../Pagination/Pagination';
import classes from './styles.module.css';
import { ThemeProvider } from "@material-ui/core";
import Box from '@mui/material/Box';
import { themeColor } from '../../App';
import RatingUsers from './../RatingUsers/RatingUsers';
import { useTranslation } from "react-i18next";

function useQuery() {
    return new URLSearchParams(useLocation().search);
};

const Home = () => {

    const owner = JSON.parse(localStorage.getItem('profile'));
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const clear = () => {
        setSearch('');
        setTags([]);
        dispatch(getPosts(page));
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags}`);
        } else {
            navigate('/');
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    useEffect(() => {
        if (page) {
            dispatch(getPosts(page));
        }
    }, [dispatch, page]);

    return (
        <ThemeProvider theme={themeColor}>
            <Grow in>
                <Container maxWidth="xl">
                    <Box sx={{ marginTop: '20px', minHeight: 'calc(100vh - 60px)' }} >
                        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={6} md={3} >
                                {!owner?.result
                                    ?
                                    <Paper sx={{ padding: '10px', marginTop: '15px' }}>
                                        <Typography variant="h6" align="center" >
                                            {t("Please_Sign_In_to_create_your_own_memories_and_like_others_memories")}
                                        </Typography>
                                    </Paper>
                                    :
                                    <Paper sx={{ padding: '20px', marginTop: '15px' }} elevation={6}>
                                        < Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={() => navigate('/posts/create')}>{t("Create_Article")}</Button>
                                    </Paper>
                                }
                                <Paper className={classes.appBarSearch} elevation={6} >
                                    <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label={t("Search_by_Title")} fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                                    <TextField onKeyDown={handleKeyPress} sx={{ marginTop: '15px' }} placeholder={t("Tags_coma_separated")} name="tags" variant="outlined" label={t("Search_by_tags")} fullWidth value={tags} onChange={(e) => setTags(e.target.value)} />
                                    <Button onClick={searchPost} sx={{ marginTop: '15px' }} variant="contained" color="primary" fullWidth>{t("Search")}</Button>
                                    <Button variant="contained" color="secondary" size="small" sx={{ margin: '15px 0 10px 0' }} onClick={clear} fullWidth>{t("Clear")}</Button>
                                </Paper>
                                <RatingUsers />
                            </Grid>
                            <Grid item xs={12} sm={6} md={9}>
                                <Posts />
                                {(!searchQuery && !tags.length) && (
                                    <Paper elevation={6} sx={{}}>
                                        <Paginate page={page} />
                                    </Paper>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Grow>
        </ThemeProvider>
    );
};

export default Home;