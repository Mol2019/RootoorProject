import React from 'react';
import './not-found.css';
import { Link } from 'react-router-dom';

export const NotFoundComponent = () => ( 
    <div id="notfound">
        <div className="notfound-bg">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className="notfound">
            <div className="notfound-404">
                <h1>404</h1>
            </div>
            <h2>Page Not Found</h2>
            <Link to="/" className="btn btn-primary">Accueil</Link>
        </div>
    </div>
 )
