import React from 'react';
import ProposedPost from './ProposedPost';
import classes from './styles.module.css';
import {Typography, Divider} from '@material-ui/core/';
import { useTranslation } from "react-i18next";

const RecomendetPosts = ({ posts, post }) => {

    const recommendedPosts = posts?.filter(({ _id }) => _id !== post?._id);
    const { t } = useTranslation();
    
    return (
        <>
            {recommendedPosts.length > 0 ? (
                <div className={classes.section}>
                    <Divider style={{ margin: '10px 0' }} />
                    <Typography variant="h6">{t("You_may_also_like")}</Typography>
                    <Divider style={{ margin: '10px 0' }} />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts?.map((post) => (
                            <ProposedPost post={post} key={post?._id} />
                        ))}
                    </div>
                </div>
            )
                :
                null}
        </>
    )
}

export default RecomendetPosts;