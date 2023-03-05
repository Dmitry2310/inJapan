import React from "react";
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

const LanguageButton = ({ handleChangeLanguage, handleMenuLang, handleCloseLang, anchorElLang }) => {

    const { t, i18n } = useTranslation()

    return (
        <>
            <Button color={"primary"} variant="contained" sx={{ borderRadius: '6px' }}
                aria-controls="language-appbar" onClick={handleMenuLang} size="large" >
                {t("Language")}
            </Button>
            <Menu
                id="language-appbar"
                anchorEl={anchorElLang}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElLang)}
                onClose={handleCloseLang}
                sx={{ mt: 0.5 }}
            >
                <MenuItem onClick={handleChangeLanguage("en")} sx={{ minWidth: 120 }}>EN</MenuItem>
                <MenuItem onClick={handleChangeLanguage("ja")} sx={{ minWidth: 120 }}>JA</MenuItem>
                <MenuItem onClick={handleChangeLanguage("ru")} sx={{ minWidth: 120 }}>RU</MenuItem>
            </Menu>
        </>
    )
}

export default LanguageButton;