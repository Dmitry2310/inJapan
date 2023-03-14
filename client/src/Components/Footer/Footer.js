import React from "react";
import { useTranslation } from "react-i18next";
import Box from '@mui/material/Box';
import { Typography } from "@material-ui/core";

const Footer = () => {

    const { t } = useTranslation();

    return (
        <Box sx={{marginTop: '80px', marginTop: 'auto'}}>
            <div style={{ display: 'flex', justifyContent: 'center',flexDirection: 'column', alignItems: 'center', height: '90px', background: '#8561c5', marginTop: '30px', borderRadius: '6px', padding: '10px' }}>
            <Typography sx={{ fontSize: {xs: '12px', md: '16px'}, color: ' white', padding: '5px 0', display: 'flex', alignItems: 'center' }}>{t("Connect")}: <p style={{paddingLeft: '10px', textDecoration: 'underline'}}>avgustindmitry@gmail.com</p></Typography>
                <Typography sx={{ fontSize: {xs: '10px', md: '16px'}, color: ' white', padding: '5px 0'  }}>{t("Footer")}</Typography>
            </div>
        </Box>
    )
};

export default Footer;