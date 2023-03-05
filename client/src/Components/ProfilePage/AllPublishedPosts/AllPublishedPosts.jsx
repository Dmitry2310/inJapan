import React from 'react';
import { useSelector } from "react-redux";
import { CircularProgress } from '@material-ui/core';
import { Grid } from "@mui/material";
import Post from "../../Posts/Post/Post";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserPosts } from "../../../actions/posts";
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";

const AllPublishedPosts = ({ id }) => {

    const dispatch = useDispatch();
    const { usersPosts, isLoading } = useSelector((state) => state.posts);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getUserPosts(id));
    }, [id, dispatch]);

    return (
        <>
            {isLoading ?
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', width: '100%' }}>
                    <CircularProgress size="5em" />
                </div>
                :
                <>
                    {usersPosts?.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
                            <Post post={post} />
                        </Grid>
                    ))}
                </>
            }
            {
                !usersPosts.length && !isLoading ? <Box sx={{height: '200px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: '0.6'}}>{t("No_Articles")}</Box> : null
            }
        </>
    )
}

export default AllPublishedPosts;