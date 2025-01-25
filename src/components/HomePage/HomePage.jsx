import React from 'react'
import './HomePage.css'
import { Link, Switch } from 'react-router-dom/cjs/react-router-dom.min'

function HomePage() {
    return (

        <>
            <div className="home-section">
                <div className="home-content">
                    <img src='../images/iteration-1-images/logo.svg' />
                    <h2 className="home-subtitle">KOD ACIKTIRIR, PİZZA DOYURUR</h2>
                    <Link to='/OrderPage'>
                        <button className="btn">Acıktım</button>
                    </Link>
                </div>
            </div>
        </>

    )
}

export default HomePage