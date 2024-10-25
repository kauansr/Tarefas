import React from 'react';
import { Link } from 'react-router-dom';
import style from '../components/Header.module.css';

function Header({ links }) {
    return (
        <header className={style.header}>
            <h1>TodoList</h1>
            <nav>
                {links.map((link, index) => (
                    <Link key={index} to={link.path}>
                        {link.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}

export default Header;