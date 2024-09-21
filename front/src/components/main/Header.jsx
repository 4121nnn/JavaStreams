import { useEffect, useState } from 'react';
import { useAuth } from '../../service/auth/useAuth.jsx';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, loading } = useAuth();

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        //console.log("Token status:", isAuthenticated);


    }, [isAuthenticated]);
    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator or placeholder
    }

    return (
        <div className='relative h-14 bg-neutral-800 text-white '>
            <div className='m-auto max-w-6xl relative h-14 bg-neutral-800 text-white flex items-center justify-between px-4'>
                <a href="/public">
                    <div className='flex items-center justify-center text-center'>

                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48">
                            <path fill="#F44336" d="M23.65,24.898c-0.998-1.609-1.722-2.943-2.725-5.455C19.229,15.2,31.24,11.366,26.37,3.999c2.111,5.089-7.577,8.235-8.477,12.473C17.07,20.37,23.645,24.898,23.65,24.898z"></path>
                            <path fill="#F44336" d="M23.878,17.27c-0.192,2.516,2.229,3.857,2.299,5.695c0.056,1.496-1.447,2.743-1.447,2.743s2.728-0.536,3.579-2.818c0.945-2.534-1.834-4.269-1.548-6.298c0.267-1.938,6.031-5.543,6.031-5.543S24.311,11.611,23.878,17.27z"></path>
                            <g>
                                <path fill="#1565C0" d="M32.084 25.055c1.754-.394 3.233.723 3.233 2.01 0 2.901-4.021 5.643-4.021 5.643s6.225-.742 6.225-5.505C37.521 24.053 34.464 23.266 32.084 25.055zM29.129 27.395c0 0 1.941-1.383 2.458-1.902-4.763 1.011-15.638 1.147-15.638.269 0-.809 3.507-1.638 3.507-1.638s-7.773-.112-7.773 2.181C11.683 28.695 21.858 28.866 29.129 27.395z"></path>
                                <path fill="#1565C0" d="M27.935,29.571c-4.509,1.499-12.814,1.02-10.354-0.993c-1.198,0-2.974,0.963-2.974,1.889c0,1.857,8.982,3.291,15.63,0.572L27.935,29.571z"></path>
                                <path fill="#1565C0" d="M18.686,32.739c-1.636,0-2.695,1.054-2.695,1.822c0,2.391,9.76,2.632,13.627,0.205l-2.458-1.632C24.271,34.404,17.014,34.579,18.686,32.739z"></path>
                                <path fill="#1565C0" d="M36.281,36.632c0-0.936-1.055-1.377-1.433-1.588c2.228,5.373-22.317,4.956-22.317,1.784c0-0.721,1.807-1.427,3.477-1.093l-1.42-0.839C11.26,34.374,9,35.837,9,37.017C9,42.52,36.281,42.255,36.281,36.632z"></path>
                                <path fill="#1565C0" d="M39,38.604c-4.146,4.095-14.659,5.587-25.231,3.057C24.341,46.164,38.95,43.628,39,38.604z"></path>
                            </g>
                        </svg>
                        <span className='text-xl font-bold text-neutral-300 '>Java</span>
                        <span className='text-xl italic text-neutral-500'>Streams</span>

                    </div>
                </a>


                <nav className='hidden md:flex space-x-4 text-neutral-300'>
                    <a href='/public' className='hover:underline'>Home</a>
                    <a href='/about' className='hover:underline'>About</a>
                    {isAuthenticated ? (
                        <a href='/logout' className='hover:underline'>Sign Out</a>
                    ) : (
                        <a href='/login' className='hover:underline'>Sign In</a>
                    )}

                </nav>

                <button
                    className='md:hidden p-2'
                    onClick={toggleMenu}
                >
                    {isOpen ? (
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                        </svg>
                    ) : (
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
                        </svg>
                    )}
                </button>

                {isOpen && (
                    <div className='md:hidden fixed top-14 right-4 bg-neutral-900 p-4 rounded-b-xl text-neutral-300 border-neutral-500 border-l-2 border-r-2 border-b-2 shadow-lg z-50'>
                        <nav className='flex flex-col space-y-2'>
                            <a href='/home' className='hover:underline' onClick={toggleMenu}>Home</a>
                            <a href='/about' className='hover:underline' onClick={toggleMenu}>About</a>
                            {isAuthenticated ? (
                                <a href='/logout' className='hover:underline'>Sign Out</a>
                            ) : (
                                <a href='/login' className='hover:underline'>Sign In</a>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
