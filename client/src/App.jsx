import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import { createTheme } from "@material-ui/core";
import Auth from "./Components/Auth/Auth";
import PostDetails from "./Components/PostDetails/PostDetails";
import Profile from "./Components/ProfilePage/Profile";
import ScrollToTop from "./assets/ScrollToTop";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import CreatePost from "./Components/CreatePost/CreatePost";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Components/Footer/Footer";

export const themeColor = createTheme({
    palette: {
        primary: {
            main: '#673ab7',
            light: '#8561c5',
            dark: '#482880'
        },
        secondary: {
            main: '#f73378',
            light: '#cb937c',
            dark: '#ab003c'
        }
    }
});

const App = () => {

    let notification = useSelector((state) => state.auth.message)

    useEffect(() => {
        if (notification !== ' ') {
            toast.error(notification)
        }
    }, [notification]);

    return (
        < Router>
            < Container maxWidth="xl" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                < Navbar />
                < ToastContainer position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light" />
                <ScrollToTop>
                    <Routes>
                        < Route path="/" exact element={<Navigate to="/posts" replace />} />
                        < Route path="/posts" exact element={<Home />} />
                        < Route path="/posts/search" exact element={<Home />} />
                        < Route path="/posts/:id" element={<PostDetails />} />
                        < Route path="/auth" exact element={<Auth />} />
                        < Route path="/auth/:id" exact element={<Profile />} />
                        < Route path="/user/:id" exact element={<Profile />} />
                        < Route path="/posts/create" exact element={<CreatePost />} />
                    </Routes>
                </ScrollToTop>
                <Footer />
            </Container>
        </Router>
    )
};

export default App;