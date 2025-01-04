import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/userSlice';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Layout({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state?.auth?.role)

    const handleLogout = async (event) => {
        event.preventDefault();

        const res = await dispatch(logout());

        if (res?.payload?.success) {

        }
    };
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);
    return (
        <>
            <div className='flex flex-col min-h-screen'>
                <Header />
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Layout