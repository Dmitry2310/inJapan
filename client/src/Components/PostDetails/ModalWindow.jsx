import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { themeColor } from '../../App';
import { ThemeProvider } from '@mui/material';
import { useTranslation } from "react-i18next";

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignAitems: 'center',
    justifyContent: 'space-around',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '260px', sm: '430px'},
    height: 150,
    bgcolor: '#ffffff',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
};

export default function TransitionsModal({ handleClose, open, deleteThisPost, postId }) {

    const { t } = useTranslation();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <ThemeProvider theme={themeColor}>
                            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{width: '100%', textAlign: 'center'}}>
                                {t("Are_you_sure_you_want_to_delete_the_article")}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
                                <Button size="small" variant='contained' color="primary" onClick={() => handleClose()}>
                                    {t("Cancel")}
                                </Button>
                                <Button size="small" variant='contained' color="secondary" onClick={() => deleteThisPost(postId)}>
                                    <DeleteIcon fontSize="small" /> &nbsp; {t("Delete")}
                                </Button>
                            </Box>
                        </ThemeProvider>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};