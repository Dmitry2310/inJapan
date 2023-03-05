/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationItem from '@mui/material/PaginationItem';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { themeColor } from '../../App';
import { getPosts } from '../../actions/posts';

const Paginate = ({ page }) => {

    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (page) {
            dispatch(getPosts(page));
        }
    }, [dispatch, page]);

    return (
        <ThemeProvider theme={themeColor}>
            {numberOfPages === 0
                ?
                null
                :
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px', padding: '10px 0' }}>
                    <Pagination
                        count={numberOfPages}
                        page={Number(page) || 1}
                        variant="outlined"
                        color="primary"
                        renderItem={(item) => (
                            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
                        )}
                    />
                </div>
            }
        </ThemeProvider>
    );
};

export default Paginate;