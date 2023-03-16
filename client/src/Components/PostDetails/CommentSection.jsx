import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { commentPost } from '../../actions/posts';
import { themeColor } from '../../App';
import { Grid, ThemeProvider } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import noAvatar from "./../../Images/noAvatar.png";
import { baseURL } from '../../api';
import { useTranslation } from "react-i18next";

const CommentSection = ({ post }) => {
  const owner = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post?.comments);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleComment = async () => {
    setIsLoading(true);
    const newComments = await dispatch(commentPost(comment, post._id));
    setIsLoading(false);
    setComment('');
    setComments(newComments);
  };

  return (
    <Grid container gap={2} sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
      <Grid item xs={12} sm={7} >
        <Typography gutterBottom variant="h6">{t("Comments")}</Typography>
        {!comments?.length
          ?
          <Typography gutterBottom variant="h6" sx={{ textAlign: 'center', opacity: '0.6' }}>{t("No_comments_yet")}</Typography>
          :
          <>
            {comments?.map((comment, i) => (
              <div key={i} style={{ padding: '10px 0' }}>
                <div style={{ display: 'flex', marginBottom: '5px' }}>
                  <Typography variant="h6" sx={{ fontWeight: '450', display: 'flex', alignItems: 'center', cursor: 'pointer' }}  onClick={() => navigate(`/user/${comment.creatorId}`)}>
                    <Avatar alt={post?.creator.name} src={comment?.creatorAvatar ? comment?.creatorAvatar : noAvatar} style={{ borderRadius: '25px', width: '25px', height: '25px', objectFit: 'contain', margin: '0 10px 0 10px', cursor: 'pointer' }}></Avatar>
                    {comment?.creatorName}
                    <span style={{ marginLeft: '20px', opacity: '0.5', fontSize: '16px' }}>{moment(comment?.createdAt).fromNow()}</span>
                  </Typography>
                </div>
                <Typography sx={{ paddingLeft: '10px' }}>{comment?.value}</Typography>
              </div>
            ))}
          </>
        }
      </Grid>
      <ThemeProvider theme={themeColor} >
        {!owner?.result
          ?
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: '10px', marginTop: '15px' }}>
              <Typography variant="h6" align="center" >
                {t("Please_Sign_In_to_create_your_own_memories_and_like_others_memories")}
              </Typography>
            </Paper>
          </Grid>
          :
          <Grid item xs={12} sm={4}>
            <Typography gutterBottom variant="h6">{t("Write_a_comment")}</Typography>
            <TextField fullWidth rows={3} variant="outlined" label={t("Comment")} color="primary" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
            <br />
            {!isLoading
              ?
              <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment?.length || !owner} color="primary" variant="contained" onClick={handleComment}>
                {t("Publish")}
              </Button>
              :
              <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment?.length} color="primary" variant="contained" onClick={handleComment}>
                <CircularProgress color="secondary" size="25px" />
              </Button>
            }
          </Grid>
        }
      </ThemeProvider>
      <Grid item xs={12}>
      </Grid>
    </Grid >
  );
};

export default CommentSection;