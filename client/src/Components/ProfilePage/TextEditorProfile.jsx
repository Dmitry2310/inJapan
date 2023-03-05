import { Box } from "@material-ui/system";
import React from 'react';
import JoditEditor from 'jodit-react';
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const TextEditorProfile = ({ setChangetUser, changedUser }) => {

	const { t } = useTranslation();

	return (
		<Box sx={{ padding: { xs: '15px', sm: '30px' } }}>
			<Typography variant="body2" sx={{opacity: '0.8'}}>{t("Information_about_Me")}</Typography>
			<JoditEditor
				placeholder={'ppp'}
				value={changedUser.desc}
				/* config={config} */
				tabIndex={1} // tabIndex of textarea
				onBlur={newContent => setChangetUser({ ...changedUser, desc: newContent })} // preferred to use only this option to update the content for performance reasons
			/* onChange={newContent => {}} */
			/>
		</Box>
	)
};

export default TextEditorProfile;