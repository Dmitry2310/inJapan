import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import Box from '@mui/material/Box';

import Post from './Post/Post';

const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { t } = useTranslation();

  if (!posts.length && !isLoading) return (
    <Box sx={{width: '100%', height: '100%', minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: '0.6'}}>
      {t("No_Articles")}
    </Box>
  );

  return (
    isLoading
      ?
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '600px' }}>
        <CircularProgress size="5em" />
      </div>
      :
      (
        <Grid container alignItems="stretch" spacing={2}>
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={4} lg={3}>
              <Post post={post}  />
            </Grid>
          ))}
        </Grid>
      )
  );
};

export default Posts;