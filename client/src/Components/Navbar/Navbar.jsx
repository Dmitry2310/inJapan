import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import japanLogo from "./../../Images/JapanLogo.png";
import decode from "jwt-decode";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import classes from "./styles.module.css";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { themeColor } from "../../App";
import { ThemeProvider } from '@mui/material/styles';
import { recoverUser } from "./../../actions/auth";
import noAvatar from "./../../Images/noAvatar.png";
import { baseURL } from "../../api";
import { useTranslation } from "react-i18next";
import LanguageButton from "./LanguegeButton";

export const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const myProfile = useSelector((state) => state.auth.profile);
    const owner = JSON.parse(localStorage.getItem('profile'));
    const [user, setUser] = useState(myProfile);
    const token = owner?.token

    //Change language ----------
    const [anchorElLang, setAnchorElLang] = React.useState(null);
    const { t, i18n } = useTranslation();

    const handleMenuLang = (event) => {
        setAnchorElLang(event.currentTarget);
    };

    const handleChangeLanguage = (nextLanguage) => () => {
        handleCloseLang();
        handleCloseUserMenu();
        i18n.changeLanguage(nextLanguage);
    }

    const handleCloseLang = () => {
        setAnchorElLang(null);
    };

    //END Change language ----------

    useEffect(() => {
        setUser(myProfile);
    }, [myProfile]);

    // Navigate ------------------------------
    const goToHomePage = () => {
        navigate('/');
    };

    const goToAuth = () => {
        handleCloseUserMenu();
        navigate('/auth');
    }

    const goToProfile = () => {
        handleCloseUserMenu();
        navigate(`/auth/${user?._id}`);
    }

    const logOut = useCallback(
        () => {
            handleCloseUserMenu();
            dispatch({ type: "LOGOUT" });
            navigate('/');
            setUser(null);
        },
        [dispatch, navigate]
    );
    // END Navigate ------------------------------  


    useEffect(() => {
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
            dispatch(recoverUser());
        }
    }, [location, logOut, token, dispatch]);

    // Mobile view navigation ---------------
    const settings = [{ name: `${t("Profile")}`, method: goToProfile }, { name: `${t("Logout")}`, method: logOut }];
    const settingsNoUser = [{ name: `${t("Login")}`, method: goToAuth }];
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // END Mobile view navigation ---------------

    return (
        <ThemeProvider theme={themeColor} >
            < AppBar position="sticky" color="inherit" sx={{ borderRadius: '15px' }} maxwidth="sm">
                <div className={classes.appBar}>
                    <div className={classes.brandContainer} >
                        <div onClick={goToHomePage} style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h4" >
                                InJapan
                            </Typography>
                            < img className={classes.image} src={japanLogo} alt="japanLogo"></img>
                        </div>
                    </div>
                    <Toolbar>
                        <div className={classes.appBarButtons} >
                            {user ? (
                                <div className={classes.profile} >
                                    <Avatar alt={user?.name} src={(user?.avatar !== "") ? `${baseURL}/${user?.avatar}` : noAvatar} sx={{ marginRight: '30px', cursor: 'pointer' }} onClick={goToProfile}>{user?.name.charAt(0)}</Avatar>
                                    <Button variant="contained" color="secondary" onClick={logOut}>{t("Logout")}</Button>
                                </div>
                            ) : (
                                <Button component={Link} to="/auth" variant="contained" color="primary">{t("Login")}</Button>
                            )}
                            <div>
                                <LanguageButton handleChangeLanguage={handleChangeLanguage} handleMenuLang={handleMenuLang} handleCloseLang={handleCloseLang} anchorElLang={anchorElLang} />
                            </div>
                        </div>
                        <div className={classes.appBarMobile}>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src={user?.avatar ? `${baseURL}/${user?.avatar}` : noAvatar} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {user &&
                                        settings.map((setting) => (
                                            <MenuItem key={setting.name} onClick={setting.method} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <Typography textalign="center">{setting.name}</Typography>
                                            </MenuItem>
                                        ))
                                    }
                                    {!user &&
                                        settingsNoUser.map((setting) => (
                                            <MenuItem key={setting.name} onClick={setting.method} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <Typography textalign="center">{setting.name}</Typography>
                                            </MenuItem>
                                        ))
                                    }
                                    <MenuItem >
                                        <LanguageButton handleChangeLanguage={handleChangeLanguage} handleMenuLang={handleMenuLang} handleCloseLang={handleCloseLang} anchorElLang={anchorElLang} sx={{ margin: '0 auto' }} />
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </div>
                    </Toolbar>
                </div>
            </AppBar >
        </ThemeProvider>
    )
};

export default Navbar;
