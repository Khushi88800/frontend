import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);
    return (
        <header className="sticky top-0 z-50 ">
            <div className="max-w-5xl mx-auto mt-4 flex items-center justify-between p-4 rounded-full bg-gray-100">
                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-10 h-10"
                    />
                    <span className="text-indigo-500 font-bold text-lg">Varnav Infotech</span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-8 text-black">
                    <Link
                        href="/"
                        className="relative hover:text-indigo-500 transition group"
                    >
                        Home
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link
                        href="/about"
                        className="relative hover:text-indigo-500 transition group"
                    >
                        About
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link
                        href="/work"
                        className="relative hover:text-indigo-500 transition group"
                    >
                        Client Work
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link
                        href="/contact"
                        className="relative hover:text-indigo-500 transition group"
                    >
                        Contact Us
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    {
                        isLoggedIn && role === "ADMIN" && (
                            <Link
                                to="/admin"
                                className="relative hover:text-indigo-500 transition group"
                            >
                                Dashboard
                                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>

                        )
                    }

                    {
                        isLoggedIn && role === "USER" && (
                            <Link
                                href="/services"
                                className="relative hover:text-indigo-500 transition group"
                            >
                                Services
                                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        )
                    }

                </nav>


                {/* Avatar */}
                <Link to='/profile/me' className="relative group">
                    <img
                        src="/avatar.png"
                        alt="Avatar"
                        className="w-10 h-10 rounded-full border-2 border-indigo-500"
                    />
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-white text-sm rounded-md px-4 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Profile
                    </div>
                </Link>
            </div>
        </header>
    );
}

export default Header;
