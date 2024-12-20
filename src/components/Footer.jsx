import React from 'react'

function Footer() {
    const newDate = new Date();
    const year = newDate.getFullYear();

    return (
        <>
            <div className="footer border-t border-gray-300 py-6 px-4 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {/* Contact Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Contact Us</h2>
                        <div className="flex items-start space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                            >
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                            <p>7400 Varnav Infotech, India</p>
                        </div>
                        <div className="flex items-start space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                            >
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Z" />
                            </svg>
                            <p>temp1234@gmail.com</p>
                        </div>
                        <div className="flex items-start space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                            >
                                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
                            </svg>
                            <p>+8801785830142</p>
                        </div>
                        <div className="flex items-start space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                            >
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                            </svg>
                            <p>10:00 AM - 10:00 PM (Everyday)</p>
                        </div>
                    </div>

                    {/* App Links Section */}
                    <div>
                        <h2 className="text-lg font-semibold">Install App</h2>
                        <p>From App Store or Google Play</p>
                        <div className="flex space-x-4 mt-2">
                            <img
                                src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/app-store.jpg"
                                alt="App Store"
                                className="h-10"
                            />
                            <img
                                src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/google-play.jpg"
                                alt="Google Play"
                                className="h-10"
                            />
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className='md:space-x-2'>
                        <h2 className="text-lg font-semibold ">Quick Links</h2>
                        <ul className="space-y-2 ">
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Account
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Log In
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Sign In
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Registration
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Forgot Password
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us Section */}
                    <div>
                        <h2 className="text-lg font-semibold">Follow Us</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    YouTube
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Business Section */}
                    <div>
                        <h2 className="text-lg font-semibold">Business</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Create A Seller Account
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Seller Rules
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    View Shop
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Report Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Footer