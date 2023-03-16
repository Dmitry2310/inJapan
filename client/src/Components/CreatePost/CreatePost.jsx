import React, { useState } from "react";
import { Paper, Typography, CircularProgress } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { Grid, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createPost } from "../../actions/posts.js";
import { themeColor } from '../../App';
import JapanLogo from "./../../Images/JapanLogo.png";
import { Box } from "@mui/system";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ReactPlayer from 'react-player';
import TextEditor from "./TextEditor.jsx";
import { useTranslation } from "react-i18next";

const CreatePost = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: [],
        selectedVideo: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const clear = () => {
        setPostData({ title: '', message: '', tags: [], selectedVideo: '' });
        setSelectedImage('');
    };
    //Sent req to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedImage) {
            const base64 = await convertToBase64(selectedImage);
            const post = { ...postData, base64File: base64 };
            dispatch(createPost(post, navigate));
        } else {
            dispatch(createPost(postData, navigate));
        }
        setIsLoading(true);
        clear();
        setSelectedImage('');
    };
    // END Sent req to the server

    //Upload cover photo -------------
    const [selectedImage, setSelectedImage] = useState('');
    const hiddenFileInput = React.useRef(null);

    const fileChange = (e) => {
        if (e.target.files.length !== 0) {
            setSelectedImage(e.target.files[0]);
        } else {
            return;
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    };

    const handleClick = () => {
        hiddenFileInput.current.click();
    };
    // END Upload cover photo -------------

    if (isLoading) {
        return (
            <Paper elevation={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '15px', height: '39vh', marginTop: '50px' }}>
                <ThemeProvider theme={themeColor}>
                    <CircularProgress size="7em" />
                </ThemeProvider>
            </Paper>
        );
    };

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px', marginTop: '30px' }} elevation={6}>
            <ThemeProvider theme={themeColor}>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container gap={2} sx={{ flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-around' }}>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ paddingLeft: '15px', opacity: '0.8' }}>{t("Enter_the_title_of_your_Article")}</Typography>
                            <TextField required name="title" variant="outlined" label={t("Title")} sx={{ margin: '15px 20px 0 0' }} color="primary" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                            <Typography sx={{ paddingLeft: '15px', opacity: '0.8', marginTop: '25px' }}>{t("Enter_the_tags_separated_by_commas_so_that_other_people_can_find_your_article_using_them")}</Typography>
                            <TextField required name="tags" variant="outlined" label={t("Tags_coma_separated")} sx={{ margin: '15px 20px 0 0' }} color="primary" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                            <Box sx={{ paddingTop: '40px' }} >
                                <Typography sx={{ padding: '0 0 10px 15px', opacity: '0.8' }}>{t("Your_Article")}</Typography>
                                <TextEditor setPostData={setPostData} postData={postData} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Grid container gap={2} sx={{ padding: '5px' }}>
                                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                                    <Typography sx={{ opacity: '0.8', marginTop: '25px' }}>{t("Add_the_cover_of_your_Article")}</Typography>
                                    <Card sx={{ maxWidth: '80%', margin: '0 auto' }} elevation={3}>
                                        <CardMedia
                                            component="img"
                                            alt={'picture'}
                                            height="220px"
                                            image={selectedImage !== '' ? URL.createObjectURL(selectedImage) : JapanLogo}
                                        />
                                    </Card>
                                    <Box>
                                        <input type='file' style={{ display: 'none' }} onChange={fileChange} ref={hiddenFileInput}></input>
                                        <Button variant='contained' onClick={handleClick}>{t("Upload_cover_Image")}</Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ paddingLeft: '15px', opacity: '0.8', margin: '20px 0 15px 0' }}>{t("Add_a_link_to_your_video")}</Typography>
                                    <TextField name="video" variant="outlined" label={t("Video_Link")} color="primary" fullWidth value={postData.selectedVideo} onChange={(e) => setPostData({ ...postData, selectedVideo: e.target.value })} />
                                    {postData?.selectedVideo
                                        ?
                                        <>
                                            <Box sx={{ position: 'relative', paddingTop: '56.25%', marginTop: '20px' }}>
                                                <ReactPlayer
                                                    style={{ position: 'absolute', top: '0', left: '0' }}
                                                    url={postData?.selectedVideo}
                                                    width='100%'
                                                    height='100%'
                                                />
                                            </Box>
                                        </>
                                        :
                                        null
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', width: '100%', justifyContent: { md: 'flex-end' }, flexDirection: { xs: 'column', md: 'row' } }}>
                                < Button variant="contained" color="primary" size="medium" type="submit" sx={{ margin: '10px ' }} >{t("Submit")}</Button>
                                < Button variant="contained" color="secondary" size="medium" sx={{ margin: '10px', marginRight: { md: '5%' } }} onClick={clear} >{t("Clear")}</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </ThemeProvider>
        </Paper>
    )
}

export default CreatePost;