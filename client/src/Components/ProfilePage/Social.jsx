import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import HttpIcon from '@mui/icons-material/Http';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from "@mui/material";

const Social = ({ isEdit, user, changedUser, setChangetUser }) => {

    return (
        <>
            {isEdit
                ?
                <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                    <Grid item sx={{ dispaly: 'flex', gap: '2' }} xs={12} sm={6} md={3}>
                        <FacebookIcon fontSize='large' sx={{ color: '#3b5998', color: 'rgb(59, 89, 152)' }} />
                        <TextField name="FaceBook" variant="outlined" label="Facebook" color="primary" fullWidth value={changedUser?.social?.facebook} onChange={(e) => setChangetUser((prevState) => ({ ...prevState, social: { ...prevState.social, facebook: e.target.value } }))} />
                    </Grid>
                    <Grid item sx={{ dispaly: 'flex', gap: '2' }} xs={12} sm={6} md={3}>
                        <InstagramIcon fontSize='large' sx={{ color: '#bc2a8d', color: 'rgb(188, 42, 141)' }} />
                        <TextField name="Instagram" variant="outlined" label="Instagram" color="primary" fullWidth value={changedUser?.social?.insta} onChange={(e) => setChangetUser((prevState) => ({ ...prevState, social: { ...prevState.social, insta: e.target.value } }))} />
                    </Grid>
                    <Grid item sx={{ dispaly: 'flex', gap: '2' }} xs={12} sm={6} md={3}>
                        <TwitterIcon fontSize='large' sx={{ color: '#00aced', color: 'rgb(0, 172, 237)' }} />
                        <TextField name="Twitter" variant="outlined" label="Twitter" color="primary" fullWidth value={changedUser?.social?.twitter} onChange={(e) => setChangetUser((prevState) => ({ ...prevState, social: { ...prevState.social, twitter: e.target.value } }))} />
                    </Grid>
                    <Grid item sx={{ dispaly: 'flex', gap: '2' }} xs={12} sm={6} md={3}>
                        <PinterestIcon fontSize='large' sx={{ color: '#cb2027', color: 'rgb(203, 32, 39)' }} />
                        <TextField name="Pinterest" variant="outlined" label="Pinterest" color="primary" fullWidth value={changedUser?.social?.pinterest} onChange={(e) => setChangetUser((prevState) => ({ ...prevState, social: { ...prevState.social, pinterest: e.target.value } }))} />
                    </Grid>
                    <Grid item sx={{ dispaly: 'flex', gap: '2' }} xs={12} sm={6} md={3}>
                        <YouTubeIcon fontSize='large' sx={{ color: '#bb0000', color: 'rgb(187, 0, 0)' }} />
                        <TextField name="YouTube" variant="outlined" label="YouTube" color="primary" fullWidth value={changedUser?.social?.youtube} onChange={(e) => setChangetUser((prevState) => ({ ...prevState, social: { ...prevState.social, youtube: e.target.value } }))} />
                    </Grid>
                    <Grid item sx={{ dispaly: 'flex', gap: '2' }} xs={12} sm={6} md={3}>
                        <HttpIcon fontSize='large' sx={{ color: '#000000' }} />
                        <TextField name="HTTP" variant="outlined" label="http://" color="primary" fullWidth value={changedUser?.social?.http} onChange={(e) => setChangetUser((prevState) => ({ ...prevState, social: { ...prevState.social, http: e.target.value } }))} />
                    </Grid>
                </Grid>
                :
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                    {user?.social?.facebook
                        &&
                        <a target="_blank" href={user?.social?.facebook}><FacebookIcon fontSize='large' sx={{ color: '#3b5998', color: 'rgb(59, 89, 152)' }} /></a>
                    }
                    {user?.social?.insta
                        &&
                        <a target="_blank" href={user?.social?.insta}><InstagramIcon fontSize='large' sx={{ color: '#bc2a8d', color: 'rgb(188, 42, 141)' }} /></a>
                    }
                    {user?.social?.twitter
                        &&
                        <a target="_blank" href={user?.social?.twitter}><TwitterIcon fontSize='large' sx={{ color: '#00aced', color: 'rgb(0, 172, 237)' }} /></a>
                    }
                    {user?.social?.pinterest
                        &&
                        <a target="_blank" href={user?.social?.pinterest}><PinterestIcon fontSize='large' sx={{ color: '#cb2027', color: 'rgb(203, 32, 39)' }} /></a>
                    }
                    {user?.social?.youtube
                        &&
                        <a target="_blank" href={user?.social?.youtube}><YouTubeIcon fontSize='large' sx={{ color: '#bb0000', color: 'rgb(187, 0, 0)' }} /></a>
                    }
                    {user?.social?.http
                        &&
                        <a target="_blank" href={user?.social?.http}><HttpIcon fontSize='large' sx={{ color: '#000000' }} /></a>
                    }
                </Box>
            }
        </>
    )
};

export default Social;