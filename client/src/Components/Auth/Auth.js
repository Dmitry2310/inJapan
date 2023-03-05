import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import { useDispatch } from "react-redux";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";
import Input from "./Input";
import { signIn, signUp } from "./../../actions/auth";
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { themeColor } from "./../../App";
import Grow from '@mui/material/Grow';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const handleShowPassword = () => setShowPassword((prevState) => !prevState);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signUp(formData, navigate));
        } else {
            dispatch(signIn(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const switchMode = () => {
        setIsSignUp((prevState) => !prevState);
        setShowPassword(false);
    };

    return (
        <Grow in>
            <Container component="main" maxWidth="xs" sx={{ minHeight: '80vh' }}>
                <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginTop: '100px' }} elevation={3}>
                    <Avatar>
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography variant="h5" sx={{ margin: '15px' }}>{isSignUp ? t("SignUp") : t("Login")}</Typography>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <Grid container spacing={3} autoComplete="off">
                            {
                                isSignUp && (
                                    <>
                                        <Input name="firstName" label={t("Name")} handleChange={handleChange} autoFocus fullWidth />
                                    </>
                                )
                            }
                            <Input name="email" label={t("Email")} handleChange={handleChange} type="email" />
                            <Input name="password" label={t("Password")}  handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignUp && <Input name="confirmPassword" label={t("Repeat_Password")} handleChange={handleChange} type="password" />}
                        </Grid>
                        <ThemeProvider theme={themeColor} >
                            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: '30px' }}>
                                {isSignUp ? t("SignUp")  : t("Login")}
                            </Button>
                            <Grid container justifyContent="center" spacing={2}>
                                <Grid item>
                                    <Button onClick={switchMode} sx={{ marginTop: '20px' }}>
                                        {isSignUp ? t("Already_have_an_account") : t("Dont_have_an_account")}
                                    </Button>
                                </Grid>
                            </Grid>
                        </ThemeProvider>
                    </form>
                </Paper>
            </Container>
        </Grow>
    )
}

export default Auth;