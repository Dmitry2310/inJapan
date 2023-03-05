import { Box } from "@material-ui/system";
import React from 'react';
import JoditEditor from 'jodit-react';


const TextEditor = ({ setPostData, postData }) => {
    
    return (
        <Box>
		<JoditEditor
			value={postData.message}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setPostData({ ...postData, message: newContent })} // preferred to use only this option to update the content for performance reasons
		/>
        </Box>
    )
};

export default TextEditor;