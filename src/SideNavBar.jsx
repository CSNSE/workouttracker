import React, { useState, useEffect, useRef } from 'react';
import './SideNavBar.css';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const SideNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const sideNavRef = useRef();

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [sideNavRef]);

    return (
        <div className={`side-nav-bar ${isOpen ? 'open' : ''}`} ref={sideNavRef}>
            <button className="toggle-button" onClick={toggleNav}>☰</button>
            {isOpen && (
                <nav className="nav-links">
                    <ul className='Button-List'>
                        <li><button className='button' onClick={() => navigate('/')}>Home</button></li>
                        <li><button className='button' onClick={() => navigate('/Progress')}>Progress</button></li>
                        <li><button className='button' onClick={() => navigate('/profile')}>Profile Page</button></li>
                        <li><button className='button' onClick={() => navigate('/MyFeed')}>Feed</button></li>
                        <li><button className="button" onClick={() => auth.signOut()}>Sign Out</button></li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default SideNavBar;
